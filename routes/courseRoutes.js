const router = require("express").Router();

const courseController = require("../controllers/courseController");

router.get("/", courseController.getAllCourses);

module.exports = router;
