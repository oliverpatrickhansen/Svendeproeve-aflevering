const express = require("express");
const router = express.Router();
const { guard } = require("../middleware/authMiddleware");
const {
  registerUser,
  loginUser,
  getMe,
  getUserFromId
} = require("../controllers/userController");

// This route is basically api/goals/about
// This is because we have app.use("/api/goals", require("./routes/userRoutes"))
// This means that whenenever someone on the frontend/a client accesses
// the route /api/goals it'll automatically redirect to the userRoutes.js
// file, where it will then determine the endpoint that needs to be
// accessed. This way the code is cleaner and easier to change.
// And this way it's also easier to seperate different rescources.
// As in, you can have a file for caseRoutes or userRoutes or something else
// All in all; clean, efficient and flexible project structure and code.

// router.get("/about", (req, res) => {
//     res.status(200).json({ message: "About page" });

//   });

// Because get/post and put/delete have the same route, we can combine
// them onto one line of code by using router.route.
router.post("/", registerUser);
router.post("/login", loginUser);
router.get("/me", guard, getMe);
router.get("/getuser/:id", getUserFromId);

// router.get("/", getUsers);
// router.post("/", postUser);
// router.put("/:id", updateUser);
// router.delete("/:id", deleteUser);

module.exports = router;
