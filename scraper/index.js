const cron = require('cron');
const { busquedaComputrabajo } = require('./scraperComputrabajo');
const { busquedaBumeran } = require('./scraperBumeran');

const cronJobScrapper = () => {
  console.log('Scraper Start with Cron')
  new cron.CronJob(
    //'5 14 1-31 0-11 0-6',
    '23 15 1-31 0-11 0-6',
    async () => {
      console.log('Ejecutando...');
      console.log(new Date().toLocaleString());
      // busqueda('desarrollador backend trainee', '');
      //await busquedaBumeran('backend', '');
      //await busquedaBumeran('frontend', '');
      await busquedaComputrabajo('desarrollador frontend', '');
      // busqueda('desarrollador trainee', '');
      // busqueda('desarrollador junior', '');
      await busquedaComputrabajo('desarrollador backend', '');
      // busqueda('desarrollador backend trainee', '');
      // busqueda('desarrollador', '');
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

cronJobScrapper()
