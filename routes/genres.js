const express = require("express");
const router = express.Router();
const Joi = require("joi");

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

router.get("/", (req, res) => {
  res.send(genres);
});

// Get a genre by id
router.get("/:id", (req, res) => {
  const genre = genres.find((g) => g.id === parseInt(req.params.id));
  if (!genre) {
    res.status(404).send("Genre with the given id is not found!");
    return;
  }
  res.send(genre);
});

// POST or CREATE
router.post("/", (req, res) => {
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
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
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

module.exports = router;
