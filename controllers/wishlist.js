const { query } = require("express");
const fs = require("fs");
const { connection } = require("../config/mysql");

const getWishlist = (req, res) => {
  const userId = req.params.id;
  const query = `SELECT * FROM travel_list as A LEFT JOIN travel as B ON a.travel_id = B.id WHERE A.user_id=?`;
  connection.query(query, [userId], (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    console.log(userId);
    res.status(200).json({ message: "Succesfull", data: result });
  });
};

const deleteWishlist = (req, res) => {
  try {
    const { id } = req.params;
    const data = fs.readFileSync("./data/wishlist.json", "utf-8");
    const parsedData = JSON.parse(data);
    const findIndex = parsedData.wishlist.findIndex((el) => el.id === id);
    if (findIndex == -1) {
      return res.status(402).json({ message: "iim id tai wishlist bhgui bn" });
    }
    parsedData.wishlist.splice(findIndex, 1);
    fs.writeFileSync("./data/wishlist.json", JSON.stringify(parsedData));
    res
      .status(201)
      .json({ message: `${id} тай category амжилттай устгагдлаа.` });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

module.exports = { getWishlist, deleteWishlist };
