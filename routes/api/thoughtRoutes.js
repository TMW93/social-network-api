const router = require(`express`).Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  createReaction,
} = require(`../../controllers/thoughtController`);

// /api/thoughts
router.route(`/`).get(getThoughts).post(createThought);

// /api/thought/:thoughtId
router.route(`/:thoughtId`).get(getSingleThought).put(updateThought).delete(deleteThought);

// /api/thoughts/:thoughtId/reactions
router.route(`/:thoughtId/reactions`).post(createReaction);

module.exports = router;