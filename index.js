const express = require("express");
const app = express();
// Routes
const genres = require("./routes/genres");
const home = require("./routes/home");

// Middlewares
app.use(express.json());
app.use("/api/genres", genres);
app.use("/", home);

PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
