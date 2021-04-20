const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = Schema({
	firstName: { type: String },
	lastName: { type: String },
	emailAddress: { type: String },
	password: { type: String },
	isAdmin: { type: Boolean, default: false },
	mobileNumber: { type: String },
});

module.exports = mongoose.model("user", userSchema);
