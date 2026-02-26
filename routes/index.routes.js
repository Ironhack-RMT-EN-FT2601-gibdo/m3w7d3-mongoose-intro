const express = require("express")
const router = express.Router()

// Test Routes
router.get("/", (req, res, next) => {
  res.status(200).json({ message: "all good here!" })
})

router.get("/test/:recipeId", (req, res) => {

  console.log("req.query", req.query)
  console.log("req.params", req.params)
  console.log("req.body", req.body)
  console.log("req.headers", req.headers)

  res.status(200).send("all good! reaching the route")
})

// Routes for Artists
const artistsRoutes = require("./artists.routes")
router.use("/artists", artistsRoutes)

// Routes for Songs
const songsRoutes = require("./songs.routes")
router.use("/songs", songsRoutes)

module.exports = router