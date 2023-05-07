// use "import" to import libraries
import express from "express";
import cors from "cors";

// use "require" to import JSON files
const admins = require("./data/admins.json");
const sAdmins = require("./data/super-admins.json");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/admins", (req, res) => {
  res.status(200).json({
    data: admins,
  });
});

app.get("/sAdmins", (req, res) => {
  res.status(200).json({
    data: sAdmins,
  });
});

app.get("/sAdmins/getById", (req, res) => {
  res.status(200).json({
    data: sAdmins.id,
  });
});

app.get("/sAdmins/post", (req, res) => {
  res.status(200).json({
    data: sAdmins.body,
  });
});

app.get("/:id", (req, res) => {
  res.status(200).json({
    data: sAdmins.body,
  });
});

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
