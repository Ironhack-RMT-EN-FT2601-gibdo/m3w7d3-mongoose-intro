process.loadEnvFile()

const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const app = express();

// initialize DB connection
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
  console.log("All good, connected to the Database")
})
.catch((error) => {
  console.log(error)
})

// all middlewares & configurations here
app.use(logger("dev"));
app.use(express.static("public"));

// to allow CORS access from anywhere
app.use(cors({
  origin: "*"
}));

// below two configurations will help express routes at correctly receiving data. 
app.use(express.json()); // recognize an incoming Request Object as a JSON Object
app.use(express.urlencoded({ extended: false })); // recognize an incoming Request Object as a string or array


// all routes here...
app.get("/", (req, res, next) => {
  res.json({ message: "all good here!" })
})

app.get("/test/:recipeId", (req, res) => {

  console.log("req.query", req.query)
  console.log("req.params", req.params)
  console.log("req.body", req.body)
  console.log("req.headers", req.headers)

  res.send("all good! reaching the route")
})


// Routes for Artists
const Artist = require("./models/artist.model")

// Create

app.post("/artists", (req, res) => {

  console.log(req.body)

  Artist.create({
    name: req.body.name,
    awardsWon: req.body.awardsWon,
    isTouring: req.body.isTouring,
    genre: req.body.genre
  })
  .then(() => {
    res.send("Artist created! all good")
  })
  .catch((error) => {
    console.log(error)
    res.json(error)
  })

  
})

app.get("/artists", async (req, res) => {

  console.log(req.query)

  // const query = {
  //   awardsWon: {$gte: req.query.awardsWon}
  // }

  try {
    
    // const response = await Artist
    // .find({$and: [{isTouring:true}, {genre: {$in: ["rock"]}}]})
    // .select({name: 1, awardsWon: 1}) // only return the name and the awardsWon
    // .sort({awardsWon: 1}) // sort numerically ascending by awardsWon

    const response = await Artist.find(req.query)

    res.json(response)

  } catch (error) {
    console.log(error)
  }
})

app.get("/artists/:artistId", async (req, res) => {

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

// server listen & PORT
const PORT = process.env.PORT || 5005

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
