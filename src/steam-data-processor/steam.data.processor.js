import { filterGamesByName } from "./game.filter.utils";
import { sanitizeGamesList } from "./game.sanitizer.utils";
import { crawlWebsiteForImageMOCK } from "./website.crawler";

// rename to GameData
export class SteamDataProcessor {
  #databaseClient;
  #steamClient;

  constructor(steamClient, databaseClient) {
    this.#steamClient = steamClient;
    this.#databaseClient = databaseClient;
  }

  async addGamesToCollection() {
    this.#getAllSteamApps();
    this.#identifyGames();
  }

  async #getAllSteamApps() {
    // get all the steam apps
    // store them to the db into the new collection
    const steamApps = await this.#steamClient.getAppList();
    await this.#databaseClient.insertMany("steam_apps", steamApps);
  }

  async #identifyGames() {
    // get all steam apps from our db
    // one by one check is it a game
    // if its a game, store it in the games collection
    // and get missing data { imageUrl, image }
    const steamApps = await this.#databaseClient.getAll("steam_apps");
    const gamesNameFiltered = filterGamesByName(steamApps);
    const games = sanitizeGamesList(gamesNameFiltered);

    crawlWebsiteForImageMOCK(games);

    this.#databaseClient.insertMany("games", games);
  }
}