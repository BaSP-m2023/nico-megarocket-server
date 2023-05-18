import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongoServer = new MongoMemoryServer();
let mongo;

// Make the connection to a fake database
beforeAll(async () => {
  mongo = await MongoMemoryServer.create();

  const uri = mongo.getUri();
  const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };
  await mongoose.connect(uri, mongoOptions);
});

// Disconnect from the fake database
afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});
