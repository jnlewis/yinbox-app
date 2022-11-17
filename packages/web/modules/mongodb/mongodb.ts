import * as mongoDB from 'mongodb';
import { Config } from 'core/config/config';
import { MongoDBMessages } from './collections/messages.collections';
import { MongoDBChats } from './collections/chats.collections';
import DBMessage from './models/dbMessage.model';
import DBChat from './models/dbChat.model';
import { MongoDBUsers } from './collections/users.collections';
import DBUser from './models/dbUser.model';

enum CollectionNames {
  Chats = 'chats',
  Messages = 'messages',
  Users = 'users',
}

export class MongoDB {
  client: mongoDB.MongoClient;

  public collections: {
    chats?: MongoDBChats;
    messages?: MongoDBMessages;
    users?: MongoDBUsers;
  } = {};

  constructor() {}

  async connectToDatabase() {
    this.client = new mongoDB.MongoClient(Config.databaseConnection);
    await this.client.connect();

    const db = this.client.db(Config.databaseName);

    // // Apply schema validation to the collection
    // await applySchemaValidation(db);

    this.collections.chats = new MongoDBChats(
      db.collection<DBChat>(CollectionNames.Chats),
    );
    this.collections.messages = new MongoDBMessages(
      db.collection<DBMessage>(CollectionNames.Messages),
    );
    this.collections.users = new MongoDBUsers(
      db.collection<DBUser>(CollectionNames.Users),
    );

    console.log(`Successfully connected to database: ${db.databaseName}`);
  }

  async disconnectFromDatabase() {
    this.client.close();
  }
}
