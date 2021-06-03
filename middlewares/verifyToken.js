const jwt = require("jsonwebtoken")

const verifyToken = (req,res,next) => {

	let token = req.headers.authorization;
	// console.log(token)

	if (!token) res.send("access denied");

	try {
		const verified = jwt.verify(token.slice(7), process.env.JWT_SECRET);

		// adds a user property to the request object with the verified token
		// then after next, the endpoint has access to that user property
		// which can be accessed by the endpoint after next function
		req.user = verified;
		next();
	} catch (err) {
		res.send("invalid token");
	}

}

module.exports = {
	verifyToken
}