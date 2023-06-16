const express = require("express");
const router = express.Router();
const {
  getCase,
  getUserCases,
  getAllCases,
  postCase,
  updateCase,
  deleteCase,
} = require("../controllers/caseController");
const { guard } = require("../middleware/authMiddleware");

router.route("/").get(guard, getUserCases).post(guard, postCase);
router.route("/:id").put(guard, updateCase).delete(guard, deleteCase)
router.get("/case/:id", getCase);
router.get("/all", getAllCases);

module.exports = router;
