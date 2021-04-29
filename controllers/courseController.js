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
// const getAllCourses = async (req, res) => {
// 	const courses = await Course.find({});
// 	res.send({ courses });
// };

// combined getallcourses and getonecourse via id
const getCourses = async (req, res) => {
	console.log(req.query);

	if (req.query.id) {
		const course = await Course.findById(req.query.id);
		res.send({ course });
	} else {
		const courses = await Course.find({});
		res.send({ courses });
	}
};

module.exports = {
	getCourses,
};
