const router = require("express").Router();
const admin = require("firebase-admin");

router.route("/all").get((req, res) => {
  var db = admin.database();
  var userRef = db.ref("player");

  userRef.once("value", function (snap) {
    res.status(200).json({ players: snap.val() });
  });
});

module.exports = router;
