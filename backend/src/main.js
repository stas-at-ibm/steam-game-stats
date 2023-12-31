import httpClient from "axios";
import { DatabaseClient } from "./infrastructure/database/database.client.js";
import { SteamClient } from "./infrastructure/steam.client.js";
import { SteamAppsAggregator } from "./features/steam-apps-aggregator/steam.apps.aggregator.js";
import { GameIdentifier } from "./features/game-identifier/game.identifier.js";
import { delay, hoursToMs } from "./utils/time.utils.js";
import { PlayerHistoryAggregator } from "./features/player-history-aggregator/player.history.aggregator.js";
import { Runner } from "./utils/runner.js";
import { WebServer } from "./infrastructure/web.server.js";
import { GameQueriesController } from "./features/game-queries/game.queries.controller.js";
import { GameQueriesRouter } from "./features/game-queries/game.queries.router.js";
import { GamesRepository } from "./infrastructure/database/repositories/games.repository.js";
import { SteamAppsRepository } from "./infrastructure/database/repositories/steam.apps.repository.js";
import { SteamAppsUpdateTimestampsRepository } from "./infrastructure/database/repositories/steam.apps.update.timestamps.repository.js";
import { PlayerHistoryRepository } from "./infrastructure/database/repositories/player.history.repository.js";
import { HistoryChecksRepository } from "./infrastructure/database/repositories/history.checks.repository.js";
import { MongoServerSelectionError } from "mongodb";
import { logger } from "./utils/logger.js";

// our entry point = main
async function main() {
  // setup phase
  const databaseOptions = {
    url: "mongodb://localhost:27017",
    databaseName: "game-stats",
    collections: ["games", "steam_apps", "update_timestamps", "history_checks"],
  };

  let databaseClient;
  try {
    databaseClient = await new DatabaseClient(logger).init(databaseOptions);
  } catch (error) {
    if (error instanceof MongoServerSelectionError) {
      /**
       * @todo https://github.com/lukatarman/steam-game-stats/issues/39
       */
      logger.error("db connection failed");
      logger.error(error, `error message: ${error.message}`);
      logger.error(`verify connection string: ${databaseOptions.url}`);
      logger.error("verify the db is running");
      logger.error("performing graceful application shutdown");
      process.exit(0);
    }

    logger.error("unknown error, add handling");
    logger.error("performing shutdown with error response");
    process.exit(1);
  }

  const gamesRepository = new GamesRepository(databaseClient);
  const steamAppsRepository = new SteamAppsRepository(databaseClient);
  const steamAppsUpdateTimestampRepository = new SteamAppsUpdateTimestampsRepository(
    databaseClient,
  );
  const playerHistoryRepository = new PlayerHistoryRepository(databaseClient);
  const historyChecksRepository = new HistoryChecksRepository(databaseClient);
  const steamClient = new SteamClient(httpClient);
  const options = {
    batchSize: 5,
    batchDelay: 5000,
    unitDelay: 800,
    currentPlayersUpdateIntervalDelay: hoursToMs(2),
    updateIntervalDelay: hoursToMs(12),
    iterationDelay: 5000,
  };
  const steamAppsAggregator = new SteamAppsAggregator(
    steamClient,
    steamAppsUpdateTimestampRepository,
    steamAppsRepository,
    logger,
    options,
  );
  const gameIdentifier = new GameIdentifier(
    steamClient,
    steamAppsRepository,
    gamesRepository,
    historyChecksRepository,
    logger,
    options,
  );
  const playerHistoryAggregator = new PlayerHistoryAggregator(
    steamClient,
    gamesRepository,
    historyChecksRepository,
    playerHistoryRepository,
    logger,
    options,
  );
  const gameQueriesController = new GameQueriesController(gamesRepository);
  const gameQueriesRouter = new GameQueriesRouter(gameQueriesController);
  const webServer = new WebServer(gameQueriesRouter);
  await webServer.start();

  const runnables = [
    steamAppsAggregator.collectSteamApps,
    gameIdentifier.tryViaSteamWeb,
    gameIdentifier.tryViaSteamchartsWeb,
    /**
     * @todo batch delay must be performed by runner
     */
    playerHistoryAggregator.addPlayerHistoryFromSteamcharts,
    playerHistoryAggregator.addCurrentPlayers,
  ];
  const { AxiosError } = httpClient;
  const expectedErrorsTypes = [AxiosError];
  const runner = new Runner(logger, delay, options.iterationDelay);

  try {
    /**
     * @todo fix bug - https://github.com/lukatarman/steam-game-stats/issues/40
     */
    await runner.run(runnables, expectedErrorsTypes);
  } catch (error) {
    logger.error(error);
  }

  /**
   * @todo https://github.com/lukatarman/steam-game-stats/issues/39
   */
  logger.info("done...");
}

main().catch((error) => {
  logger.fatal(error, "unexpected error caught by main, add handling");
  logger.fatal("performing shutdown with error response");
  process.exit(1);
});
