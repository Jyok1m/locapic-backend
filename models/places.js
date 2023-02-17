const mongoose = require("mongoose");

const placeSchema = mongoose.Schema({
  nickname: String,
  name: String,
  latitude: Number,
  longitude: Number,
});

const Places = mongoose.model("places", placeSchema);

module.exports = Places;
