const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
	name: { type: String },
	description: { type: String },
	price: { type: Number },
	isActive: { type: Boolean, default: true },
	createdOn: { type: Date, default: new Date() },
	enrollees: [
		{
			userId: { type: String },
			enrolledOn: { type: Date, default: new Date() },
			status: { type: String },
		},
	],
});

module.exports = mongoose.model("Courses", courseSchema);
