const dotenv = require('dotenv');

const { app } = require('./app');

// Utils
const { initModels } = require('./models/initModels');
const { jobsRouter } = require('./routes/job.routes');
const { cronJobScrapper } = require('./scraper');
const { busqueda } = require('./scraper/scraperComputrabajo');
const { db } = require('./utils/database.util');


dotenv.config({ path: './config.env' });

const startServer = async () => {
  try {
    console.log("Starting DB authentication")
    await db.authenticate();

    // Establish the relations between models
    console.log("Starting Models")
    initModels();
    console.log("Starting DB connection")
    await db.sync();
    await db.sync({force: true})

    // Set server to listen
    const PORT = 4000;

    app.listen(process.env.PORT || PORT, () => {
      console.log("Starting Cron")
      cronJobScrapper()
      console.log('Express app running!');   
    });

  } catch (error) {
    console.log("Error at Server Starting");
  }
};

startServer();
