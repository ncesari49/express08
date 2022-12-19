require("dotenv").config();

const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.APP_PORT ?? 5000;
const movieHandlers = require("./movieHandlers");

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};
const userHandlers = require("./userHandlers");

const { hashPassword, verifyPassword, verifyToken } = require("./auth.js");
const database = require("./database");

const isItDwight = (req, res) => {
  if (req.body.email === "dwight@theoffice.com" && req.body.password === "123456") {
    res.send("Credentials are valid");
  } else {
    res.sendStatus(401);
  }
};



app.get("/", welcome);

app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.get("/api/users/:id", userHandlers.getUserById);
app.get("/api/users", userHandlers.getUsers);

app.post("/api/users", hashPassword, userHandlers.postUser);
app.post("/api/login", userHandlers.getUserByEmail, verifyPassword);

app.use(verifyToken)

app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);

app.put("/api/users/:id", userHandlers.updateUser);
app.delete("/api/users/:id", userHandlers.deleteUser);
// app.post("/api/login", isItDwight);



app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});

