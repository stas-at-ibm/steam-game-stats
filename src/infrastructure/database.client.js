import { MongoClient } from "mongodb";
import { Game } from "../models/game.js";

export class DatabaseClient {
  #collections;

  async init(options) {
    const urlToDb = `${options.url}/${options.databaseName}`;
    const mongodb = await MongoClient.connect(urlToDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    const database = mongodb.db(options.databaseName);

    this.#collections = new Map();
    options.collections.forEach((c) =>
      this.#collections.set(c, database.collection(c))
    );

    return this;
  }

  async insertOneUpdateTimestamp(date) {
    const updateTimestamp = { updatedOn: date };
    await this.insertOne("update_timestamps", updateTimestamp);
  }

  async insertOne(collectionName, data) {
    await this.#collections
      .get(collectionName)
      .insertOne(data);
  }

  async insertManyHistoryChecks(data) {
    await this.insertMany("history_checks", data);
  }

  async insertManySteamApps(data) {
    await this.insertMany("steam_apps", data);
  }

  async insertManyGames(data) {
    await this.insertMany("games", data);
  }

  async insertMany(collectionName, data) {
    await this.#collections
      .get(collectionName)
      .insertMany(data);
  }

  getAllSteamApps(filter = {}) {
    return this.getAll("steam_apps", filter);
  }

  async getAll(collectionName, filter = {}) {
            return await this.#collections
                             .get(collectionName)
                             .find(filter)
                             .toArray();
  }

  async updateOne(collectionName, filter, data) {
    const updateResults = await this.#collections
      .get(collectionName)
      .updateOne(filter, data);
  }

  async deleteMany(collectionName, filter) {
    const deletedResults = await this.#collections
      .get(collectionName)
      .deleteMany(filter);
  }

  async getLastUpdateTimestamp() {
    return this.getLast("update_timestamps");
  }

  async getLast(collectionName) {
    const result = await this.#collections
      .get(collectionName)
      .find()
      .limit(1)
      .sort({ $natural: -1 })
      .next();

      return result;
  }

  async getXunidentifiedSteamApps(amount) {
      return await this.#collections.get("steam_apps")
                                    .find({ identified: { $eq: false }})
                                    .limit(amount)
                                    .toArray();
  }

  async identifySteamAppsById(steamApps) {
    await Promise.all(
      steamApps.map(
        async steamApp => await this.identifySteamAppById(steamApp.appid)
      )
    );
  }

  async identifySteamAppById(id) {
    await this.#collections
      .get("steam_apps")
      .updateOne(
        { appid: { $eq: id }},
        { $set: { identified: true }},
      );
  }

  async getXgamesWithoutPlayerHistory(amount) {
      return (await this.#collections.get("games")
                                     .find({ playerHistory: { $eq: [] }})
                                     .limit(amount)
                                     .toArray())
                                     .map(dbEntry => Game.fromDbEntry(dbEntry));
  }

  async updatePlayerHistoriesById(games) {
    await Promise.all(
      games.map(
        async game => await this.updatePlayerHistoryById(game)
      )
    );
  }

  async updatePlayerHistoryById(game) {
    await this.#collections.get("games")
                           .updateOne(
                             { id: game.id },
                             { $set:
                               {
                                 playerHistory: game.playerHistory,
                                 checkedSteamchartsHistory: game.checkedSteamchartsHistory,
                               }
                             }
                           );
  }

  async getXgamesWithCheckedSteamchartsHistory(amount) {
   return (await this.#collections
     .get("history_checks")
     .aggregate([
       {
         $lookup: {
           from: "games",
           localField: "gameId",
           foreignField: "id",
           as: "game"
         }
       },
       { $unwind: "$game" },
       { $replaceWith: "$game"},
      ])
     .limit(amount)
     .toArray())
     .map(dbEntry => Game.fromDbEntry(dbEntry));
  }
}
