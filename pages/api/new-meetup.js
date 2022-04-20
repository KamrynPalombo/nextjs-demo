import { MongoClient } from "mongodb";
// db username: user and password: WswUW2f30tHHlxNX

// /api/new-meetup
// POST /api/new-meetup
async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://user:WswUW2f30tHHlxNX@cluster0.i7x3f.mongodb.net/meetups?retryWrites=true&w=majority"
    );
    // creating db in mongodb cluster
    const db = client.db();
    // creating collection of meetups in db
    const meetupsCollection = db.collection("meetups");
    const result = await meetupsCollection.insertOne(data);
    console.log("Result of collection: ", result);
    client.close();
    // send response back
    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
