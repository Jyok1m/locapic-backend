var express = require("express");
var router = express.Router();

const { checkBody } = require("../modules/checkBody");
const Places = require("../models/places");

//. Route to get all the data from the DB:
router.get("/all", (req, res) => {
  Places.find({}).then((data) => res.json({ data }));
});

//. Route to add a marker to the DB:
router.post("/", (req, res) => {
  const { nickname, name, latitude, longitude } = req.body;

  //! Check if the fields are empty or null:
  if (!checkBody([nickname, name, latitude, longitude])) {
    res.json({ result: false, error: "Missing or empty fields." });
    return;
  }

  //! Post to the DB:
  const newPlace = new Places({ nickname, name, latitude, longitude });
  newPlace.save().then(() => res.json({ result: true }));
});

//. Route to get all the markers from the DB for a certaine user:
router.get("/:nickname", (req, res) => {
  const { nickname } = req.params;

  //! Get from the DB:
  Places.find({ nickname }).then((data) => {
    res.json({ result: true, places: data });
  });
});

//. Route to delete the places from a user:
router.delete("/", (req, res) => {
  const { nickname, name } = req.body;

  //! Delete from the DB:
  Places.deleteOne({ nickname, name }).then((data) =>
    res.json({ result: true, data })
  );
});

module.exports = router;
