const MongoClient = require("mongodb").MongoClient;
const dotenv = require("dotenv").config();
const mongoURL =
  "mongodb+srv://lpanavas:Password1@cluster0.b9bcp.mongodb.net/<dbname>?retryWrites=true&w=majority" ||
  "mongodb://localhost:27017";
var ObjectId = require("mongodb").ObjectId;
function myDB() {
  const database = {};

  MongoClient.connect(mongoURL, { useUnifiedTopology: true }).then((client) => {
    database.insertUser = async (insertUserPerson) => {
      const DB = client.db("Craigslist");
      const userCollection = DB.collection("userCollection");
      console.log("insertUserperson", insertUserPerson);
      const query = { username: insertUserPerson.username };
      var foundUser = await userCollection.find(query).toArray();

      if (foundUser.length === 0) {
        userCollection.insertOne(insertUserPerson);

        var user = insertUserPerson;
        console.log(user);
        return user;
      } else {
        return null;
      }
    };
    database.findUser = async (newUser) => {
      const DB = client.db("Craigslist");
      const userCollection = DB.collection("userCollection");
      //Cannot find when also searches for password.
      var foundUser = await userCollection.find(newUser.username).toArray();

      return foundUser;
    };
    database.findUserByUsername = async (usernameGiven) => {
      const DB = client.db("Craigslist");
      const userCollection = DB.collection("userCollection");
      //Cannot find when also searches for password.
      const query = { username: usernameGiven };
      var foundUser = await userCollection.find(query).toArray();

      return foundUser;
    };
    database.findUserById = async (id) => {
      const DB = client.db("Craigslist");
      const userCollection = DB.collection("userCollection");
      var o_id = new ObjectId(id._id);
      console.log(o_id);
      const query = { _id: o_id };
      //Cannot find when also searches for password.
      var foundUser = await userCollection.find(query).toArray();

      return foundUser;
    };
    database.findUserByActualId = async (id) => {
      const DB = client.db("Craigslist");
      const userCollection = DB.collection("userCollection");
      console.log("id", id);
      var o_id = new ObjectId(id);
      console.log(o_id);
      const query = { _id: o_id };
      //Cannot find when also searches for password.
      var foundUser = await userCollection.find(query).toArray();
      console.log(foundUser);
      return foundUser;
    };
    database.getAllPosts = async () => {
      const DB = client.db("Craigslist");
      const userCollection = DB.collection("priceApartments");
      var postsArray = await userCollection.find().toArray();
      return postsArray;
    };
    database.addDislike = async (data) => {
      console.log("madeit");
      const DB = client.db("Craigslist");
      const userCollection = DB.collection("priceApartments");
      var ObjectId = require("mongodb").ObjectId;
      var postId = data.postId;
      console.log(postId);
      var o_id = new ObjectId(postId);
      const query = { _id: o_id };
      const update = {
        $push: {
          dislikes: {
            username: data.username,
          },
        },
      };

      await userCollection.findOneAndUpdate(query, update);
      console.log(query);
    };
    database.addLike = async (data) => {
      console.log("madeit");
      const DB = client.db("Craigslist");
      const userCollection = DB.collection("priceApartments");
      var ObjectId = require("mongodb").ObjectId;
      var postId = data.postId;
      console.log(postId);
      var o_id = new ObjectId(postId);
      const query = { _id: o_id };
      const update = {
        $push: {
          likes: {
            username: data.username,
          },
        },
      };

      await userCollection.findOneAndUpdate(query, update);
      console.log(query);
    };
  });
  return database;
}

module.exports = myDB();
