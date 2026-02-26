const express = require("express")
const router = express.Router()

const Artist = require("../models/artist.model")

// POST "/api/artists" => Create a new artist
router.post("/", (req, res) => {

  console.log(req.body)

  Artist.create({
    name: req.body.name,
    awardsWon: req.body.awardsWon,
    isTouring: req.body.isTouring,
    genre: req.body.genre,
    favOtherArtist: req.body.favOtherArtist
  })
  .then(() => {
    res.sendStatus(201)
  })
  .catch((error) => {
    console.log(error)
    res.json(error)
  })

  
})

// GET "/api/artists" => Get all the artists
router.get("/", async (req, res) => {

  console.log(req.query)

  // let query = {}

  // query.isTouring = req.query.isTouring
  // query.genre = req.query.genre
  // query.name = req.query.name

  // const query = {
  //   awardsWon: {$gte: req.query.awardsWon}
  // }

  try {
    
    // const response = await Artist
    // .find({$and: [{isTouring:true}, {genre: {$in: ["rock"]}}]})
    // .select({name: 1, awardsWon: 1}) // only return the name and the awardsWon
    // .sort({awardsWon: 1}) // sort numerically ascending by awardsWon

    const response = await Artist.find(req.query)

    if (response.length === 0) {
      res.status(204).json(response)
    } else {
      res.status(200).json(response)
    }


  } catch (error) {
    console.log(error)
  }
})

// GET "/api/artists/:artistId" => Get artists by ID
router.get("/:artistId", async (req, res) => {

  console.log(req.params)

  try {

    //* we can do it like this, but if we have the id, it is preffered to use findById
    // const response = await Artist.findOne({_id: req.params.artistId})
    // const response = await Artist.find({_id: req.params.artistId})
    
    const response = await Artist.findById(req.params.artistId)
    
    res.json(response)
  } catch (error) {
    console.log(error)
  }

})

module.exports = router