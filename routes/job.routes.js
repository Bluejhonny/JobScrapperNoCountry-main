const express = require('express');
const cors = require('cors')

// Controllers
// Controllers
const {
  getAllJobs,
  getJobById,
  uploadJobs,
} = require('../controllers/job.controller');

const { jobExists } = require('../middlewares/job.middlewares');

const jobsRouter = express.Router();

//enable cors policy
jobsRouter.use(cors({
  origin: "*"
}))


jobsRouter.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
})

jobsRouter.get('/', getAllJobs);
jobsRouter.get('/:id', jobExists, getJobById);
jobsRouter.post('/', uploadJobs);

module.exports = { jobsRouter };
