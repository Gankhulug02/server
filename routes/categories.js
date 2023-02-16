const { Router } = require("express");

const {
  addCategory,
  changeCategory,
  getCategories,
  getCategory,
  deleteCategory,
} = require("../controllers/categories");
const router = Router();

router.post("/", addCategory).get("/", getCategories);

router.get("/:id", getCategory).put("/:id", changeCategory);

router.delete("/:id", deleteCategory);
//end of category

module.exports = router;
