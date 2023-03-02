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
  connection.query(`SELECT * FROM azure_user`, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }

    res.status(200).json({ message: "Succesfull", data: result });
  });
});

server.get("/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    `SELECT * FROM azure_user WHERE aid='${id}'`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });
        return;
      }

      res.status(200).json({ message: "Succesfull", data: result });
    }
  );
});

server.put("/:id", (req, res) => {
  const { id } = req.params;
  const name = req.body.name;
  const ovog = req.body.ovog;

  console.log(name, id);

  connection.query(
    `UPDATE azure_user SET name='${name}', ovog='${ovog}' WHERE aid='${id}'`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });
        return;
      }
      res.status(200).json({ message: "Succesfull", data: result });
    }
  );
});

server.delete("/:id", (req, res) => {
  const { id } = req.params;

  connection.query(
    `DELETE FROM azure_user WHERE aid='${id}'`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });
        return;
      }
      res.status(200).json({ message: "Succesfull", data: result });
    }
  );
});

server.post("/", (req, res) => {
  const name = req.body.name;
  const ovog = req.body.ovog;
  const aid = req.body.aid;

  console.log(name, aid, ovog);

  if (!ovog) {
    const alert = "ovog bhooson baina";
    console.log("ERROR");
    res.status(400).json({ message: alert });
    return;
  } else if (!name) {
    const alert = "name bhooson baina";
    console.log("ERROR");
    res.status(400).json({ message: alert });
    return;
  } else if (!aid) {
    const alert = "aid bhooson baina";
    console.log("ERROR");
    res.status(400).json({ message: alert });
    return;
  }

  connection.query(
    `INSERT INTO azure_user(aid, name, ovog) VALUE('${aid}','${name}','${ovog}')`,
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
