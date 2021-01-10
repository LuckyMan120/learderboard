const router = require("express").Router();
const mysql = require("mysql");

const admin = require("firebase-admin");

var serviceAccount = require("./admin.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://leaderboard-322ca-default-rtdb.firebaseio.com",
  authDomain: "leaderboard-322ca-default-rtdb.firebaseapp.com",
});

router.route("/all").get((req, res) => {
  var db = admin.database();
  var userRef = db.ref("player");

  userRef.once("value", function (snap) {
    console.log("snap", snap.val());
    res.status(200).json({ players: snap.val() });
  });
  // const connection = mysql.createConnection({
  //   host: "remotemysql.com",
  //   user: "xcMX8Nnhh8",
  //   password: "Ddy9Zfw1zT",
  //   database: "xcMX8Nnhh8",
  // });
  // // get all data for players
  // connection.query("SELECT * FROM `blast`", function (error, blast) {
  //   if (error) throw error;
  //   const data = {};
  //   data["blast"] = blast;
  //   connection.query("SELECT * FROM `player`", function (error, player) {
  //     if (error) throw error;
  //     data["player"] = player;
  //     connection.query("SELECT * FROM `profile`", function (error, profile) {
  //       if (error) throw error;
  //       data["profile"] = profile;
  //       connection.query("SELECT * FROM `tap`", function (error, tap) {
  //         if (error) throw error;
  //         data["tap"] = tap;
  //         res.json(data);
  //       });
  //     });
  //   });
  // });
});

module.exports = router;
