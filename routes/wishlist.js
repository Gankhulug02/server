const { Router } = require("express");
const cors = require("cors");
const fs = require("fs");

const router = Router();

// router.post("/", (req, res) => {
//   try {
//     const content = fs.readFileSync("categories.json", "utf-8");
//     const data = JSON.parse(content);
//     const newData = { ...req.body };
//     data.categories.push(newData);
//     fs.writeFileSync("categories.json", JSON.stringify(data));
//     res.status(201).json({ message: "amijilttai uuseglee", data: newData });
//   } catch (err) {
//     return res.status(400).json({ message: err.message });
//   }
//   res.json({});
// });

router.get("/", (req, res) => {
  try {
    const wishlist = fs.readFileSync("wishlist.json", "utf-8");
    const data = JSON.parse(wishlist);
    res.status(200).json({ message: "success", data: data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

// router.get("/:id", (req, res) => {
//   try {
//     const { id } = req.params;
//     const data = fs.readFileSync("categories.json", "utf-8");
//     const parsedData = JSON.parse(data);
//     const category = parsedData.categories.find((el) => el.id === id);
//     res.status(200).json({ category });
//   } catch (err) {
//     return res.status(400).json({ message: err.message });
//   }
// });

// router.put("/:id", (req, res) => {
//   const { id } = req.params;
//   const { title } = req.body;
//   const data = fs.readFileSync("categories.json", "utf-8");
//   const parsedData = JSON.parse(data);
//   const findIndex = parsedData.categories.findIndex((el) => el.id === id);
//   parsedData.categories[findIndex] = {
//     ...parsedData.categories[findIndex],
//     ...req.body,
//   };
//   fs.writeFileSync("categories.json", JSON.stringify(parsedData));
//   res.status(201).json({ message: "Category amjilttai soligdloo" });
// });

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const data = fs.readFileSync("wishlist.json", "utf-8");
    const parsedData = JSON.parse(data);
    const findIndex = parsedData.wishlist.findIndex((el) => el.id === id);
    if (findIndex == -1) {
      return res.status(402).json({ message: "iim id tai wishlist bhgui bn" });
    }
    parsedData.wishlist.splice(findIndex, 1);
    fs.writeFileSync("wishlist.json", JSON.stringify(parsedData));
    res
      .status(201)
      .json({ message: `${id} тай category амжилттай устгагдлаа.` });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
});
//end of category

module.exports = router;
