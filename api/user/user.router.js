const {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  deleteUser,
} = require("./user.controller");
const router = require("express").Router();

// @route api/user
router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/", updateUser);
router.delete("/", deleteUser);

module.exports = router;
