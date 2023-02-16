const cors = require("cors");
const fs = require("fs");

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
  try {
    const categories = fs.readFileSync("./data/categories.json", "utf-8");
    const data = JSON.parse(categories);
    res.status(200).json({ message: "success", data: data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

const getCategory = (req, res) => {
  try {
    const { id } = req.params;
    const data = fs.readFileSync("./data/categories.json", "utf-8");
    const parsedData = JSON.parse(data);
    const category = parsedData.categories.find((el) => el.id === id);
    res.status(200).json({ category });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};
const changeCategory = (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const data = fs.readFileSync("./data/categories.json", "utf-8");
  const parsedData = JSON.parse(data);
  const findIndex = parsedData.categories.findIndex((el) => el.id === id);
  parsedData.categories[findIndex] = {
    ...parsedData.categories[findIndex],
    ...req.body,
  };
  fs.writeFileSync("./data/categories.json", JSON.stringify(parsedData));
  res.status(201).json({ message: "Category amjilttai soligdloo" });
};

const deleteCategory = (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync("./data/categories.json", "utf-8");
  const parsedData = JSON.parse(data);
  const findIndex = parsedData.categories.findIndex((el) => el.id === id);
  parsedData.categories.splice(findIndex, 1);
  fs.writeFileSync("./data/categories.json", JSON.stringify(parsedData));
  res.status(201).json({ message: `${id} тай category амжилттай устгагдлаа.` });
};

module.exports = {
  addCategory,
  changeCategory,
  getCategories,
  getCategory,
  deleteCategory,
};
