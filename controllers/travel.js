const { connection } = require("../config/mysql");

const getTravels = (req, res) => {
  const query = `SELECT * FROM travel`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }

    res.status(200).json({ message: "Succesfull", data: result });
  });
};

module.exports = {
  getTravels,
};
