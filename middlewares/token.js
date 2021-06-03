const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET;

const createAccessToken = (userId) => {
	const token = jwt.sign({userId}, secret, {expiresIn: "2h"})

	return token;
}

module.exports = {
	createAccessToken
}