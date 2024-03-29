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

jobsRouter.get('/', getAllJobs);
jobsRouter.get('/:id', jobExists, getJobById);
jobsRouter.post('/', uploadJobs);

module.exports = { jobsRouter };
