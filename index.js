const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());

// Application routes
const userRoutes = require("./routes/userRoutes");

console.log(userRoutes);

/* Use Application routes
 * ---app.use(path,routeObject)---
 * take everything that has to do with '/api/users' put it in a separate folder
 * using the router object.
 * use userRoutes file to handle endpoints that start with /api/users
 */

app.use("/api/users", userRoutes);

// ENV VARIABLES
const port = process.env.PORT || 3001;
const dbUri = process.env.DB_CONN_STR;

// MONGOOSE CONNECTION SETUP
mongoose.connect(dbUri, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => console.log("DB connection established."));

// ROOT ROUTE
app.get("/", (req, res) => {
	res.status(200).json({
		message: "Course Booking System Root Route",
	});
});

// SERVER LISTEN
app.listen(port, () => {
	console.log(`Server listening on port 3000`);
});
