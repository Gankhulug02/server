const express = require("express"); //req = import
const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { json } = require("express");
const usersRoute = require("./routes/users");
const categoriesRoute = require("./routes/categories");

const port = 8000;

const server = express();
server.use(cors());
server.use(express.json());
server.use("/users", usersRoute);
server.use("/categories", categoriesRoute);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Hello Express Server" });
});

server.listen(port, () => {
  console.log(`сэрвэр аслаа http://localhost:${port}/ `);
});
