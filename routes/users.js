const { Router } = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const {
  getUsers,
  getUser,
  changeUser,
  deleteUser,
  createUser,
  signIn,
} = require("../controllers/users");

const router = Router();

// Auth start
// router.post("/signin", (req, res) => {
//   const { id, email, password } = req.body;
//   const data = fs.readFileSync("./data/users.json", "utf-8");
//   const parsedData = JSON.parse(data);
//   const findUser = parsedData.users.find((user) => user.email === email);
//   if (!findUser) {
//     res.status(401).json({ message: "Ийм хэрэглэгч олдсонгүй" });
//   }

//   const isCheck = bcrypt.compareSync(password, findUser.password);
//   if (isCheck) {
//     res.status(200).json({ message: "Амжилттай нэвтэрлээ.", user: findUser });
//   } else {
//     res
//       .status(401)
//       .json({ message: "Имэйл эсвэл нууц үг буруу байна.", user: null });
//   }
// });

// router.post("/signup", (req, res) => {
//   const { name, role, email, password } = req.body;
//   const data = fs.readFileSync("./data/users.json", "utf-8");
//   const parsedData = JSON.parse(data);
//   const id = uuidv4();
//   const salted = bcrypt.genSaltSync(10);
//   const hashedPassword = bcrypt.hashSync(password, salted);
//   const findUser = parsedData.users.find((user) => user.email === email);
//   console.log(hashedPassword);
//   if (findUser) {
//     res
//       .status(401)
//       .json({ message: "Ийм email тэй хэрэглэгч бүртгэлтэй байна" });
//     return;
//   }

//   const newUser = {
//     id,
//     name,
//     role,
//     email,
//     password: hashedPassword,
//   };

//   parsedData.users.push(newUser);
//   fs.writeFileSync("./data/users.json", JSON.stringify(parsedData));

//   res.status(201).json({ message: "Шинэ хэрэглэгчийгн амжилттай бүртгэлээ." });
// });
//Auth end

router.post("/signup", createUser).post("/signin", signIn);
router.get("/", getUsers);
router.get("/:id", getUser).put("/:id", changeUser).delete("/:id", deleteUser);
module.exports = router;
