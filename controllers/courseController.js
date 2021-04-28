const Course = require("../models/Course");

// const getAllCourses = (req, res) => {
// 	Course.find({}, (err, courses) => {
// 		if (err) console.error(err);
// 		res.send({
// 			courses,
// 		});
// 	});
// };

// convert to async/await instead of callbacks
const getAllCourses = async (req, res) => {
	const courses = await Course.find({});
	res.send({ courses });
};

module.exports = {
	getAllCourses,
};
