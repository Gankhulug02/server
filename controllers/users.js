const { connection } = require("../config/mysql");

// const connection = mysql.createConnection({
//   host: "localhost",
//   port: 3306,
//   user: "root",
//   password: "",
//   database: "azure_db",
// });

const getUsers = (req, res) => {
  connection.query(`SELECT * FROM user`, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }

    res.status(200).json({ message: "Succesfull", data: result });
  });
};

const getUser = (req, res) => {
  const { id } = req.params;
  connection.query(
    `SELECT * FROM user WHERE user_id='${id}'`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });
        return;
      }

      res.status(200).json({ message: "Succesfull", data: result });
    }
  );
};

const changeUser = (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const keys = Object.keys(body);
  const map = keys.map((key) => `${key}="${body[key]}"`);
  const join = map.join();

  connection.query(
    `UPDATE user SET ${join} WHERE user_id='${id}'`,
    (err, result) => {
      if (err) {
        res.status(400).json({ message: err.message });
        return;
      }
      res.status(200).json({ message: "Succesfull", data: result });
    }
  );
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  connection.query(`DELETE FROM user WHERE user_id='${id}'`, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(200).json({ message: "Succesfull", data: result });
  });
};

module.exports = { getUsers, getUser, changeUser, deleteUser };
