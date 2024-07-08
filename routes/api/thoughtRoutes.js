const router = require(`express`).Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
} = require(`../../controllers/thoughtController`);

// /api/thoughts
router.route(`/`).get(getThoughts).post(createThought);

// /api/thought/:thoughtId
router.route(`/:thoughtId`).get(getSingleThought).put(updateThought);

module.exports = router;