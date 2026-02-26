const mongoose = require("mongoose")

// Schema (the blueprint for documents)
const artistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  awardsWon: {
    type: Number,
    min: [0, "Awards Won has to be a minimun of 0"],
    default: 0
  },
  isTouring: Boolean,
  genre: {
    type: [String],
    enum: ["rock", "techno", "reggeaton", "alternative", "metal"]
  },
  favOtherArtist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Artist"
  }
})

// Model (the tool that allows us to go into this BD collection)
const Artist = mongoose.model("Artist", artistSchema)
//1. first arg: The internal name of the model. ALWAYS singular and always PascalCasing
//2. seconds arg: the schema

module.exports = Artist