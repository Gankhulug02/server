const { connection } = require("../config/mysql");
const bcrypt = require("bcrypt");

const createUser = (req, res) => {
  const { name, email, password } = req.body;
  const salted = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salted);
  console.log(name);
  console.log(email);
  console.log(password);

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
  console.log(email, password);
  const query = `SELECT password, name FROM user WHERE email= ?`;
  connection.query(query, [email], (err, result) => {
    if (err) {
      res.status(400).json({ message: "Ийм хэрэглэгч олдсонгүй" });
      return;
    }
    if (result[0] == null) {
      res.status(400).json({ message: "Ийм хэрэглэгч олдсонгүй" });
      return;
    }
    const hashedPass = result[0].password;
    const isCheck = bcrypt.compareSync(password, hashedPass);
    const name = result[0].name;
    if (isCheck) {
      res.status(200).json({ message: "Амжилттай нэвтэрлээ.", user: name });
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

module.exports = {
  getUsers,
  getUser,
  changeUser,
  deleteUser,
  createUser,
  signIn,
};
