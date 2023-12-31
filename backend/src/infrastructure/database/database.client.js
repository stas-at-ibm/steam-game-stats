import { MongoClient } from "mongodb";

export class DatabaseClient {
  #collections;
  #connection;
  #logger;

  constructor(logger) {
    this.#logger = logger;
  }

  async init(options) {
    const urlToDb = `${options.url}/${options.databaseName}`;
    this.#connection = await MongoClient.connect(urlToDb, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    this.#logger.info("db connection established");

    const database = this.#connection.db(options.databaseName);

    this.#collections = new Map();
    options.collections.forEach((c) => this.#collections.set(c, database.collection(c)));

    const formated = (await database.listCollections().toArray())
      .map((col) => col.name)
      .join(", ");

    this.#logger.info(`db name: ${options.databaseName}`);
    this.#logger.info(`db collections: ${formated}`);

    return this;
  }

  async disconnect() {
    this.#connection.close();
  }

  // low level
  async insertOne(collectionName, data) {
    await this.#collections.get(collectionName).insertOne(data);
  }

  async insertMany(collectionName, data) {
    await this.#collections.get(collectionName).insertMany(data);
  }

  async getAll(collectionName, filter = {}) {
    return await this.#collections.get(collectionName).find(filter).toArray();
  }

  get(collectionName) {
    return this.#collections.get(collectionName);
  }

  async updateOne(collectionName, filter, data) {
    await this.#collections.get(collectionName).updateOne(filter, data);
  }

  async deleteMany(collectionName, filter) {
    await this.#collections.get(collectionName).deleteMany(filter);
  }

  async getLast(collectionName) {
    return await this.#collections
      .get(collectionName)
      .find()
      .sort({ $natural: -1 })
      .limit(1)
      .next();
  }
}
