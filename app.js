const express = require('express');
const cors = require('cors')

// Routers
const { usersRouter } = require('./routes/users.routes');
const { jobsRouter } = require('./routes/job.routes')

// Controllers
const { globalErrorHandler } = require('./controllers/error.controller');

// Init our Express app
const app = express();

//enable cors policy
//app.use(cors())
app.options('*', cors()) // enable pre-flight request for all request

// Enable Express app to receive JSON data
app.use(express.json());

// Define endpoints
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/jobs', jobsRouter)

// Global error handler
app.use(globalErrorHandler);

// Catch non-existing endpoints
app.all('*', (req, res) => {
	res.status(404).json({
		status: 'error',
		message: `${req.method} ${req.url} does not exists in our server`,
	});
});

module.exports = { app };
