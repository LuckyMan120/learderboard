const router = require("express").Router();
const mysql = require("mysql");

router.route("/all").get((req, res) => {
  const connection = mysql.createConnection({
    host: "remotemysql.com",
    user: "xcMX8Nnhh8",
    password: "Ddy9Zfw1zT",
    database: "xcMX8Nnhh8",
  });

  // get all data for players
  connection.query("SELECT * FROM `blast`", function (error, blast) {
    if (error) throw error;
    const data = {};
    data["blast"] = blast;
    connection.query("SELECT * FROM `blast`", function (error, player) {
      if (error) throw error;
      data["player"] = player;

      connection.query("SELECT * FROM `profile`", function (error, profile) {
        if (error) throw error;
        data["profile"] = profile;

        connection.query("SELECT * FROM `tap`", function (error, tap) {
          if (error) throw error;
          data["tap"] = tap;

          res.json(data);
        });
      });
    });
  });
});

module.exports = router;
