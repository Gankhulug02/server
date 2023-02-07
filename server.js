const express = require("express"); //req = import
const cors = require("cors");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const { json } = require("express");

const port = 8000;

const server = express();
server.use(cors());
server.use(express.json());
server.get("/", (req, res) => {
  res.status(200).json({ message: "Hello Express Server" });
});

server.post("/signup", (req, res) => {
  const { name, role, email, password } = req.body;
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const id = uuidv4();
  const salted = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salted);
  const findUser = parsedData.users.find((user) => user.email === email);
  console.log(hashedPassword);
  if (findUser) {
    res
      .status(401)
      .json({ message: "Ийм email тэй хэрэглэгч бүртгэлтэй байна" });
    return;
  }

  const newUser = {
    id,
    name,
    role,
    email,
    password: hashedPassword,
  };

  parsedData.users.push(newUser);
  fs.writeFileSync("users.json", JSON.stringify(parsedData));

  res.status(201).json({ message: "Шинэ хэрэглэгчийгн амжилттай бүртгэлээ." });
});

server.post("/signin", (req, res) => {
  const { id, email, password } = req.body;
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  // const findUser = parsedData.users.find((user) => user.id === id);
  const findUser = parsedData.users.find((user) => user.email === email);
  if (!findUser) {
    res.status(401).json({ message: "Ийм хэрэглэгч олдсонгүй" });
  }

  const isCheck = bcrypt.compareSync(password, findUser.password);
  if (isCheck) {
    res.status(200).json({ message: "Амжилттай нэвтэрлээ.", user: findUser });
  } else {
    res
      .status(401)
      .json({ message: "Имэйл эсвэл нууц үг буруу байна.", user: null });
  }
});

server.get("/users", (req, res) => {
  fs.readFile("users.json", "utf-8", (err, data) => {
    if (err) {
      console.log("cant read file");
      return;
    }
    const parsedData = JSON.parse(data);
    res.status(200).json({ users: parsedData });
  });
});

server.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const user = parsedData.users.find((el) => el.id === id);
  res.status(200).json({ user });
});

server.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const findIndex = parsedData.users.findIndex((el) => el.id === id);
  parsedData.users[findIndex].name = name;
  fs.writeFileSync("users.json", JSON.stringify(parsedData));
  res
    .status(201)
    .json({ message: "Шинэ хэрэглэгчийн өгөгдөл амжилттай солигдлоо." });
});

server.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync("users.json", "utf-8");
  const parsedData = JSON.parse(data);
  const findIndex = parsedData.users.findIndex((el) => el.id === id);
  parsedData.users.splice(findIndex, 1);
  fs.writeFileSync("users.json", JSON.stringify(parsedData));
  res
    .status(201)
    .json({ message: `${id} тай хэрэглэгч амжилттай устгагдлаа.` });
});

//start of category

server.post("/categories", (req, res) => {
  try {
    const content = fs.readFileSync("categories.json", "utf-8");
    const data = JSON.parse(content);
    const newData = { ...req.body };
    data.categories.push(newData);
    fs.writeFileSync("categories.json", JSON.stringify(data));
    res.status(201).json({ message: "amijilttai uuseglee", data: newData });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
  res.json({});
});

server.get("/categories", (req, res) => {
  try {
    const categories = fs.readFileSync("categories.json", "utf-8");
    const data = JSON.parse(categories);
    res.status(200).json({ message: "success", data: data });
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
});

server.get("/categories/:id", (req, res) => {
  const { id } = req.params;
  const data = fs.readFileSync("categories.json", "utf-8");
  const parsedData = JSON.parse(data);
  const category = parsedData.categories.find((el) => el.id === id);
  res.status(200).json({ category });
});

server.put("/categories/:id", (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const data = fs.readFileSync("categories.json", "utf-8");
  const parsedData = JSON.parse(data);
  const findIndex = parsedData.categories.findIndex((el) => el.id === id);
  parsedData.categories[findIndex].title = title;
  fs.writeFileSync("categories.json", JSON.stringify(parsedData));
  res.status(201).json({ message: "Category amjilttai soligdloo" });
});

server.delete("/categories/:title", (req, res) => {
  const { title } = req.params;
  const data = fs.readFileSync("categories.json", "utf-8");
  const parsedData = JSON.parse(data);
  const findIndex = parsedData.categories.findIndex((el) => el.title === title);
  parsedData.categories.splice(findIndex, 1);
  fs.writeFileSync("categories.json", JSON.stringify(parsedData));
  res
    .status(201)
    .json({ message: `${title} тай category амжилттай устгагдлаа.` });
});
//end of category

server.listen(port, () => {
  console.log(`сэрвэр аслаа http://localhost:${port}/ `);
});
