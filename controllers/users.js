const { connection } = require("../config/mysql");
const bcrypt = require("bcrypt");
const { convertQueryStr } = require("../utils/convertQuery");

const createUser = (req, res) => {
  const { name, email, password } = req.body;
  const salted = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salted);

  const phoneNumber = 88228822;
  const query =
    "INSERT INTO user (id, name, email, phone_number, password, profile_Img) VALUES( null, ?, ?, ?, ?, ?)";
  connection.query(
    query,
    [name, email, phoneNumber, hashedPassword, "url"],
    (err, result) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res
        .status(201)
        .json({ message: "Шинэ хэрэглэгч амжилттай бүртгэгдлээ." });
    }
  );
};

const signIn = (req, res) => {
  const { email, password } = req.body;
  const query = `SELECT password, name, id FROM user WHERE email= ?`;

  connection.query(query, [email], (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }

    if (result[0] == null) {
      res.status(400).json({ message: "Ийм хэрэглэгч олдсонгүй" });
      return;
    }

    const hashedPass = result[0].password;
    const isCheck = bcrypt.compareSync(password, hashedPass);
    const name = result[0].name;
    const id = result[0].id;

    if (isCheck) {
      res
        .status(200)
        .json({ message: "Амжилттай нэвтэрлээ.", user: name, id: id });
    } else {
      res
        .status(401)
        .json({ message: "Имэйл эсвэл нууц үг буруу байна.", user: null });
    }
  });
};

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
  const query = `SELECT * FROM user WHERE id=?`;
  console.log(id);
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }

    res.status(200).json({ message: "Succesfull", data: result });
  });
};

const changeUser = (req, res) => {
  const { id } = req.params;
  const parsedData = convertQueryStr(req.body);
  const query = `UPDATE user SET ? WHERE id=?`;
  connection.query(query, [parsedData, id], (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(200).json({ message: "Succesfull" });
  });
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const query = `DELETE FROM user WHERE id=?`;
  connection.query(query, [id], (err, result) => {
    if (err) {
      res.status(400).json({ message: err.message });
      return;
    }
    res.status(200).json({ message: "Succesfull", data: result });
  });
};

module.exports = {
  getUsers,
  getUser,
  changeUser,
  deleteUser,
  createUser,
  signIn,
};
