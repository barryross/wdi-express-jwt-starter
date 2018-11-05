const
    jwt = require('jsonwebtoken'),
    User = require('./models/User'),
    { JWT_SECRET } = process.env;

// Function for creating tokens
function signToken(user) {
		const userData = user.toObject() // Convert user document from mongo into basic JS Object
<<<<<<< Updated upstream
		let usr = { _id:userData._id }
=======
		let usr = {_id:userData._id}
    // delete userData.password; // Delete the password from the user object.
>>>>>>> Stashed changes
    return jwt.sign(usr, JWT_SECRET);
};

// Middleware function for verifying tokens and protecting routes.
function verifyToken(req, res, next) {
    // Grab the token from the header, the body, or a query string.
    const token = req.get('token') || req.body.token || req.query.token;
    // If no token present, deny access.
    if (!token) return res.json({ success: false, message: "No Token Provided." });
    jwt.verify(token, JWT_SECRET, (err, decodedData) => {
        if (err) res.json({ success: false, message: "Invalid Token" });

        User.findById(decodedData._id, (err, user) => {
            if (err) res.json({ success: false, message: "Invalid Token" });
            req.user = user; // Add the user to request object.
            next(); // Proceed to the next piece of middleware, action.
        })
    })
};

module.exports = { signToken, verifyToken };