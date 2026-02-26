const express = require("express")
const router = express.Router()

const Song = require("../models/song.model")

router.post("/", async (req, res) => {

  try {
    const response = await Song.create({
      title: req.body.title,
      releasedDate: req.body.releasedDate,
      artist: req.body.artist,
      collabArtists: req.body.collabArtists
    })

    res.json(response)
  } catch (error) {
    console.log(error)
    res.json(error)
  }
})

router.get("/:songId", async (req, res, next) => {

  try {
    // const response = await Song.find().populate("artist")

    console.log(potato)

    // exampleof populate only grabbing the name, awards won and other fav artist property. Also example of nested populate.
    const response = await Song
    .findById(req.params.songId)
    .populate({
      path: "artist",
      select: {name: 1, awardsWon: 1, favOtherArtist: 1},
      populate: {
        path: "favOtherArtist",
        model: "Artist"
      }
    })
    .populate("collabArtists", "name awardsWon")


    res.json(response)
  } catch (error) {
    next(error) 
    // if we don't add an argument (move to the next available route that matches the URL)
    // if we add an argument, move straight to the 500 error handlers
  }
})

// router.patch("/api/songs/:songId/release-date")

module.exports = router