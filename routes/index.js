const express = require("express");
const router = express.Router();

const myDB = require("../db/myMongo.js");
var bcrypt = require("bcrypt");
const Passport = require("passport");
const app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const Strategy = require("passport-local").Strategy;

const Session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(cookieParser("cookie_secret"));
app.use(
  Session({
    secret: "cookie_secret",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(Passport.initialize());
app.use(Passport.session());

const MongoClient = require("mongodb").MongoClient;
const uri = process.env.mongoURL;

Passport.use(
  new Strategy(
    { passReqToCallback: true },

    async (req, username, password, done) => {
      const client = new MongoClient(uri, { useUnifiedTopology: true });
      await client.connect();
      const db = await client.db("Craigslist");
      const users = db.collection("userCollection");
      console.log(username);
      users.findOne({ username }, (err, user) => {
        console.log("user ", user);
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, { message: "Incorrect Username" });
        } else {
          bcrypt.compare(password, user.password, (err, result) => {
            console.log(password);
            console.log(result);
            if (err) throw err;
            if (result === true) {
              return done(null, user, { message: "Incorrect Username" });
            } else {
              return done(null, false);
            }
          });
        }
      });
    }
  )
);

Passport.serializeUser((user, done) => {
  console.log("serialize");
  done(null, user);
});

Passport.deserializeUser((user, done) => {
  console.log("desiearlize");
  done(null, { user });
});

router.post(
  "/signinn",
  Passport.authenticate("local", {
    failureFlash: "Invalid username or password.",
    failureMessage: "invalid",
  }),
  function (req, res) {
    console.log("authenitcated");

    res.send(req.user);
  }
);

router.get("/user", async function (req, res) {
  console.log(req.user);
  res.send(req.user);
});

router.post("/register", async function (req, res) {
  console.log("hello");
  console.log(req.body);

  var username = req.body.username;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  var user = {
    username: username,
    password: hashedPassword,
  };
  console.log(user);
  const newUser = await myDB.insertUser(user);
  console.log(newUser);
  res.send(newUser);
});
router.post("/logout", (req, res) => {
  if (req.user) {
    req.session.destroy();
    res.clearCookie("connect.sid"); // clean up!
    return res.json({ msg: "logging you out" });
  } else {
    return res.json({ msg: "no user to log out!" });
  }
});

router.post("/userName", async (req) => {
  var userId = req.body.identification;
  console.log("userID", userId);
  const newUser = await myDB.findUserByActualId(userId);
  console.log("newUser", newUser);
  return newUser;
});

router.get("/posts", async (req, res) => {
  const allPosts = await myDB.getAllPosts();
  console.log("allPosts", allPosts[0]);

  console.log("done");
  res.json(allPosts);
});

router.post("/setDislike", async (req) => {
  var data = req.body;
  console.log(data);
  await myDB.addDislike(data);
});
router.post("/setLike", async (req) => {
  var data = req.body;
  console.log(data);
  await myDB.addLike(data);
});
module.exports = router;
