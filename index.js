const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { MongoClient, ServerApiVersion, CURSOR_FLAGS, ObjectId } = require("mongodb");

const app = express();
const port = process.env.PORT || 3000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pr7icaj.mongodb.net/?appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    const portFolioDB = client.db("myPortfolio");
    const myInformation = portFolioDB.collection("user");

    // user related apis

    app.get("/user", async (req, res) => {
      //   const email = req.query.email;
      //   const query = {};
      //   if (email) {
      //     query.email = email;
      //   }
      //   console.log(query);
      const cursor = myInformation.find();
      const result = await cursor.toArray();
      //   console.log(result);
      res.send(result);
    });

    // Update a user document by string _id
    app.put("/user/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const update = req.body || {};
        if (!id || !update || Object.keys(update).length === 0) {
          return res.status(400).json({ error: "Missing id or update body" });
        }

        const result = await myInformation.updateOne({ _id: id }, { $set: update }, { upsert: false });

        if (result.matchedCount === 0) {
          return res.status(404).json({ error: "Document not found" });
        }
        return res.json({ ok: true, modifiedCount: result.modifiedCount });
      } catch (err) {
        console.error("Update user error:", err);
        return res.status(500).json({ error: "Failed to update user" });
      }
    });
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("My server is comming very soooon.....");
});

app.listen(port, () => {
  console.log(`The server is running on port ${port}`);
});
