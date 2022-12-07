//Models
const { Job } = require('../models/jobModels');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');


const getAllJobs = catchAsync(async (req, res, next) => {
  console.log("Getting Jobs Database")
  try {
    const jobs = await Job.findAll();

    res.status(200).json({
      status: 'succes',
      data: { jobs },
    });

  } catch (error) {
    console.log(error)
    res.status(500).send("Internal Server error Occured at GET Jobs")
  }
});

const saveJobs = async (links, jobs) => {
  try {
      jobsWithLinks = []
      for (let i = 0; i < links.length ; i++) {
        jobsWithLinks.push({...jobs[i],link: links[i]})
      }
      const jobPromises = jobsWithLinks.map(async job =>{
          const { name, company, location, description, link } = job;
          const savedJob = await Job.findOne({where:{name, company, description} })
          if(!savedJob){
            await Job.create({
              name,
              company,
              location,
              description,
              link,
            });
          }
        }
      )
      await Promise.all(jobPromises)
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  getAllJobs,
  saveJobs,
};
