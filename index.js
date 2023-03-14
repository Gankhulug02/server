const express = require("express"); //req = import
const cors = require("cors");
const mysql = require("mysql2");
const usersRoute = require("./routes/users");
const wishListRoute = require("./routes/wishlist");
const categoriesRoute = require("./routes/categories");
const travelsRoute = require("./routes/travel");

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
server.use("/travels", travelsRoute);
server.use("/categories", categoriesRoute);
server.use("/wishlist", wishListRoute);

server.get("/", (req, res) => {
  res.status(200).json({ message: "Servertei amjilttai nevterlee" });
});

// server.get("/:id", (req, res) => {
//   const { id } = req.params;
//   connection.query(
//     `SELECT * FROM azure_user WHERE aid='${id}'`,
//     (err, result) => {
//       if (err) {
//         res.status(400).json({ message: err.message });
//         return;
//       }

//       res.status(200).json({ message: "Succesfull", data: result });
//     }
//   );
// });

// server.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const body = req.body;
//   const keys = Object.keys(body);
//   const map = keys.map((key) => `${key}="${body[key]}"`);
//   const join = map.join();

//   connection.query(
//     `UPDATE user SET ${join} WHERE aid='${id}'`,
//     (err, result) => {
//       if (err) {
//         res.status(400).json({ message: err.message });
//         return;
//       }
//       res.status(200).json({ message: "Succesfull", data: result });
//     }
//   );
// });

// server.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   connection.query(
//     `DELETE FROM azure_user WHERE aid='${id}'`,
//     (err, result) => {
//       if (err) {
//         res.status(400).json({ message: err.message });
//         return;
//       }
//       res.status(200).json({ message: "Succesfull", data: result });
//     }
//   );
// });

server.post("/", (req, res) => {
  const body = req.body;
  let rawValues;
  let ripeValues;
  body.users.map((e) => {
    const keys = Object.keys(e);
    const map = keys.map((key) => `'${e[key]}'`);
    const join = map.join();
    rawValues += `,(${join})`;
    ripeValues = rawValues.slice(10);
  });
  connection.query(
    `INSERT INTO user(id, name, role, email, password) VALUE${ripeValues}`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });
        return;
      }
      res.status(200).json({ message: "Succesfull", data: result });
    }
  );
});

server.listen(port, () => {
  console.log(`сэрвэр аслаа http://localhost:${port}/ `);
});
