const express = require("express");
const app = express();

const genres = [
  { id: 1, genre: "Action" },
  { id: 2, genre: "Comedy" },
  { id: 3, genre: "Sci-Fi" },
];

// GET
app.get("/", (req, res) => {
  res.send("Welcom to Vidly!");
});

app.get("/api/genres", (req, res) => {
  res.send(genres);
});

// Get a genre by id
app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!course) {
    res.status(404).send("Genre with the given id is not found!");
    return;
  }
  res.send(genre);
});
