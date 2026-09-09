const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGODB_URI);

async function connectToDatabase() {
  await client.connect();
  return client.db("giftlink");
}

module.exports = { connectToDatabase };
