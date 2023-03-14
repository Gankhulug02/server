// const cors = require("cors");
// const fs = require("fs");
const { connection } = require("../config/mysql");
const { convertQueryStr } = require("../utils/convertQuery");

const addCategory = (req, res) => {
  try {
    const content = fs.readFileSync("./data/categories.json", "utf-8");
    const data = JSON.parse(content);
    const newData = { ...req.body };
    data.categories.push(newData);
    fs.writeFileSync("./data/categories.json", JSON.stringify(data));
    res.status(201).json({ message: "amijilttai uuseglee", data: newData });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  res.json({});
};

const getCategories = (req, res) => {
  const query = `SELECT * FROM categories`;
  connection.query(query, (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }

    res.status(200).json({ message: "Succesfull", data: result });
  });
};

const getCategory = (req, res) => {
  const { id } = req.params;
  const query = `SELECT * FROM categories WHERE id=?`;
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    } else if (!result[0]) {
      res.status(400).json({ message: "iim category oldsongui" });
      return;
    }
    res.status(200).json({ message: "Succesfull", data: result });
  });
};
const changeCategory = (req, res) => {
  const { id } = req.params;
  const parsedData = convertQueryStr(req.body);
  const query = `UPDATE SET ? WHERE id=?`;
  connection.query(query, [parsedData, id], (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(200).json({ message: "Succesfully Changed" });
  });
};

const deleteCategory = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM categories WHERE id=?`;

  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(200).json({ message: "Succesfull", data: result });
  });
};

module.exports = {
  addCategory,
  changeCategory,
  getCategories,
  getCategory,
  deleteCategory,
};
