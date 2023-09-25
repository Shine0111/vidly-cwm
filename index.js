const express = require("express");
const Joi = require("joi");
const app = express();

app.use(express.json());

PORT = process.env.PORT || 3000;

const genres = [
  { id: 1, genre: "Action" },
  { id: 2, genre: "Comedy" },
  { id: 3, genre: "Sci-Fi" },
];

// Utility functions
const validateGenre = (genre) => {
  // build a schema for a genre
  const schema = {
    genre: Joi.string().min(3).required(),
  };

  return Joi.validate(genre, schema);
};

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
  if (!genre) {
    res.status(404).send("Genre with the given id is not found!");
    return;
  }
  res.send(genre);
});

// POST or CREATE
app.post("/api/genres", (req, res) => {
  // validation check
  const { error } = validateGenre(req.body);
  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }

  const genre = {
    id: genres.length + 1,
    genre: req.body.genre,
  };

  genres.push(genre);
  res.send(genre);
});

// PUT or UPDATE
app.put("/api/genres/:id", (req, res) => {
  // Look up the genre
  // If not exist -> 404
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("The genre with the given id is not found.");
    return;
  }

  // Valid
  const { error } = validateGenre(req.body);
  if (error) {
    res.status(404).send(error.details[0].message);
    return;
  }

  // Update the genre
  genre.genre = req.body.genre;
  res.send(genre);
});

// DELETE
app.delete("/api/genres/:id", (req, res) => {
  // Look up the genre
  // If not exist -> 404
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("The genre with the given id is not found.");
    return;
  }

  // Delete the genre
  const index = genres.indexOf(genre);
  genres.splice(index, 1);
  // Return the deleted genre
  res.send(genre);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
