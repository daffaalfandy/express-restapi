const { genSaltSync, hashSync, compareSync } = require("bcrypt");
const { sign } = require("jsonwebtoken");
const {
  create,
  getUsers,
  getUserById,
  getUserByUsername,
  updateUser,
  deleteUser,
} = require("./user.service");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    create(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "DB Error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getUserById: (req, res) => {
    const id = req.params.id;
    getUserById(id, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "DB Error",
        });
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Data not found",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  getUsers: (req, res) => {
    getUsers((err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "DB Error",
        });
      }
      return res.status(200).json({
        success: 1,
        data: results,
      });
    });
  },
  updateUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    updateUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "DB Error",
        });
      }
      return res.status(200).json({
        success: 1,
        message: "Update successfully",
      });
    });
  },
  deleteUser: (req, res) => {
    const body = req.body;

    deleteUser(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "DB Error",
        });
      }
      return res.json({
        success: 1,
        message: "Delete successfully",
      });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByUsername(body, (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: 0,
          message: "DB Error",
        });
      }
      if (!results) {
        return res.json({
          success: 0,
          message: "Invalid email or password",
        });
      }

      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const token = sign({ result: results }, process.env.SECRET_KEY, {
          expiresIn: "1m",
        });
        return res.status(200).json({
          success: 1,
          message: "Login successfully",
          token,
          data: results,
        });
      }
    });
  },
};
