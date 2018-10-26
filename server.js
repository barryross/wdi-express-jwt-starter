require('dotenv').config()

const
	express = require('express'),
	app = express(),
	logger = require('morgan'),
	mongoose = require('mongoose'),
	MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/react-jwt',
	PORT = process.env.PORT || 3001,
  usersRoutes = require('./routes/users.js'),
  // ... other imports 
   path = require("path");

mongoose.connect(MONGODB_URI, { useNewUrlParser: true }, (err) => {
	console.log(err || `Connected to MongoDB.`)
})

app.use(logger('dev'))
app.use(express.json())

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))


app.get('/api', (req, res) => {
	res.json({message: "API root."})
})

app.use('/api/users', usersRoutes)

// Right before your app.listen(), add this:
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, (err) => {
	console.log(err || `Server running on port ${PORT}.`)
})