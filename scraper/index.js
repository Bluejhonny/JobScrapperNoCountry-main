const cron = require('cron');
const { busquedaComputrabajo } = require('./scraperComputrabajo');
const { busquedaBumeran } = require('./scraperBumeran');

const cronJobScrapper = () => {
  // cron Time is GMT
  var hours = (new Date()).getHours();
  var minutes = (new Date()).getMinutes();
  console.log(hours + " : " + minutes);
  console.log('Scraper Start with Cron')
  new cron.CronJob(
    // min hour date month day
    '10 03 1-31 0-11 0-6', 
    async () => {
      console.log('Ejecutando...');
      console.log(new Date().toLocaleString());
      try {
        await busquedaComputrabajo('frontend', '');
        await busquedaComputrabajo('backend', '');
      } catch (error) {
        console.log("Computrabajo Scraper Internal Error...")
      }
      try {
        await busquedaBumeran('backend', '');
        await busquedaBumeran('frontend', '');
      } catch(error) {
        console.log("Bumeran Scraper Internal Error...")
      }
      console.log('Finished');
      console.log(new Date().toLocaleString());
    },
    null,
    true
  );
};

module.exports = { cronJobScrapper };

//cronJobScrapper()
