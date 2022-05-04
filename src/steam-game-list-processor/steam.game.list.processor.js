import {
  filterSteamAppsByName,
  steamAppIsGame,
} from "./services/game.service.js";
import { Game } from "../models/game.js";
import { delay } from "../shared/time.utils.js";

export class SteamGameListProcessor {
  #steamClient;
  #databaseClient;
  #options;

  constructor(steamClient, databaseClient, options) {
    this.#steamClient = steamClient;
    this.#databaseClient = databaseClient;
    this.#options = options;
  }

  run() {
    while (true) {
      const steamApps = await this.#databaseClient.getXunidentifiedSteamApps(
        this.#options.batchSize
      );
      if (steamApps.length === 0) {
        await delay(this.#options.noAppsFoundDelay);
        continue;
      }

      await this.#identifyGames(steamApps);
      await delay(this.#options.batchDelay);
    }
  }

  async #identifyGames(steamApps) {
    const filteredSteamApps = filterSteamAppsByName(steamApps);

    const games = this.#filterSteamAppsByAppType(filteredSteamApps);
    if (games.length !== 0) {
      this.#databaseClient.insertMany("games", games);
    }

    steamApps.forEach((steamApp) =>
      this.#databaseClient.identifySteamAppById(steamApp.appid)
    );
  }

  async #filterSteamAppsByAppType(steamApps) {
    if (steamApps.length === 0) return [];

    const htmlDetailsPages = this.#getSteamAppsHtmlDetailsPages(steamApps);

    const [games, identifiedPages] = this.#identifyGamesFromSteamHtmlDetailsPages(steamApps, htmlDetailsPages);

    games.push(...this.#identifyGamesFromSteamchartsHtmlDetailsPages(steamApps, identifiedPages));

    return games;
  }

  #getSteamAppsHtmlDetailsPages(steamApps) {
    return steamApps.map(async (steamApp) => {
      await delay(this.#options.unitDelay);
      return await this.#steamClient.getAppHttpDetailsSteam(steamApp);
    });
  }

  #identifyGamesFromSteamHtmlDetailsPages(steamApps, htmlDetailsPages) {
    const identifiedPages = [...htmlDetailsPages];

    const games = steamApps.map((steamApp, index) => {
      if (steamAppIsGame(htmlDetailsPages[index])) {
        identifiedPages[index] = 'identified';
        return new Game(steamApp);
      }
    }).filter(game => !!game);

    return [games, identifiedPages];
  }

  #identifyGamesFromSteamchartsHtmlDetailsPages(steamApps, identifiedPages) {
    return steamApps.map((steamApp, index) => {
      if (identifiedPages[index] === 'identified') return;

      await delay(this.#options.unitDelay);

      try {
        await this.#steamClient.getAppHttpDetailsSteamcharts(steamApps[i]);
      } catch (error) {
        if (error.status !== 500) throw error;
      }

      return new Game(steamApp);
    }).filter(game => !!game);
  }
}
