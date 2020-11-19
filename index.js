const express = require("express");
const formidable = require("express-formidable");
const cors = require("cors");
const helmet = require("helmet");
require("dotenv").config();

const app = express();

app.use(formidable());
app.use(helmet());
app.use(cors());

console.log(process.env.PORT);

const characters = require("./routes/characters");
app.use(characters);

const comics = require("./routes/comics");
app.use(comics);

app.all("*", (req, res) => {
  res.status(404).json({ error: "Page Not Found" });
});

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server started on port ${process.env.PORT}`);
});
