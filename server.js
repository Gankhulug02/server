const express = require("express"); //req = import
const cors = require("cors");
const mysql = require("mysql2");
const usersRoute = require("./routes/users");
const wishListRoute = require("./routes/wishlist");
const categoriesRoute = require("./routes/categories");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "azure_db",
});

const port = 8000;

const server = express();
server.use(cors());
server.use(express.json());
server.use("/users", usersRoute);
server.use("/categories", categoriesRoute);
server.use("/wishlist", wishListRoute);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Hello Express Server" });
});

server.listen(port, () => {
  console.log(`сэрвэр аслаа http://localhost:${port}/ `);
});
