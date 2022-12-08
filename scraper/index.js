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
    //'55 14 1-31 0-11 0-6',
    '11 19 1-31 0-11 0-6',
    async () => {
      console.log('Ejecutando...');
      console.log(new Date().toLocaleString());
      // busqueda('desarrollador backend trainee', '');
      await busquedaBumeran('backend', '');
      // await busquedaBumeran('frontend', '');
      // await busquedaBumeran('fullstack', '');
      // await busquedaComputrabajo('frontend', '');
      // await busquedaComputrabajo('backend', '');
      // await busquedaComputrabajo('fullstack', '');

      console.log('Finished');
      console.log(new Date().toLocaleString());
    },
    null,
    true
  );
};

// const cronJobScrapper = async () => {
//   console.log('Ejecutando Bumeran...');
//   console.log(new Date().toLocaleString());
//   await busquedaBumeran('backend', '');
//   // await busquedaComputrabajo('desarrollador frontend', '');
//   console.log('Finished');
//   console.log(new Date().toLocaleString());
// };

module.exports = { cronJobScrapper };

//cronJobScrapper()
