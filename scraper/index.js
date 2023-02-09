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
    '45 04 1-31 0-11 0-6',
    async () => {
      console.log('Ejecutando...');
      console.log(new Date().toLocaleString());

      //   await busquedaComputrabajo('frontend', '');
      //   await busquedaComputrabajo('backend', '');
      await busquedaBumeran('frontend', '');
      await busquedaBumeran('backend', '');
      

      console.log('Finished');
      console.log(new Date().toLocaleString());
    },
    null,
    true
  );
};

module.exports = { cronJobScrapper };

//cronJobScrapper()
