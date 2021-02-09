const router = require("express").Router();
const {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
  login,
} = require("./user.controller");
const { checkToken } = require("../../auth/token_validation");

// @route api/user
router.get("/", checkToken, getUsers);
router.get("/:id", checkToken, getUserById);
router.post("/", checkToken, createUser);
router.put("/", checkToken, updateUser);
router.delete("/", checkToken, deleteUser);
router.post("/login", login);

module.exports = router;
