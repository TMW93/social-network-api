const router = require(`express`).Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require(`../../controllers/userController`);

// /api/users
router.route(`/`).get(getUsers).post(createUser);

// /api/user/:userId
router.route(`/:userId`).get(getSingleUser).put(updateUser).delete(deleteUser);

module.exports = router;