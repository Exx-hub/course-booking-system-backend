const Course = require("../models/Course");

// callback way
// const getAllCourses = (req, res) => {
// 	Course.find({}, (err, courses) => {
// 		if (err) console.error(err);
// 		res.send({
// 			courses,
// 		});
// 	});
// };

// combined getallcourses and getonecourse via id (async / await) need practice
const getCourses = async (req, res) => {
	console.log(req.query);

	if (req.query.id) {
		const course = await Course.findById(req.query.id).populate(
			"enrollees",
			"-password -enrollments -__v"
		);
		console.log(course);
		res.send({ course });
	} else {
		const courses = await Course.find({});
		res.send({ courses });
	}
};

module.exports = {
	getCourses,
};
