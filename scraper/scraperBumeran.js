const puppeteer = require('puppeteer');
const { saveJobs } = require('../controllers/job.controller');

const busquedaBumeran = async (search, location = '') => {
  console.log(`Searching for ${search} in Bumeran`);
  try {
    const browser = await puppeteer.launch({
      headless: true,
      timeout: 0,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
      // dumpio: true
    });



    var url = 'https://www.bumeran.com.ve/empleos-busqueda-' + search + '.html';
    const page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);

    await page.goto(url, {
      waitUntil: 'load',
      // Remove the timeout
      timeout: 0,
    });
    // Buscar en la pagina principal la lista de los trabajos
    const productHandles = await page.$$(`[id="listado-avisos"] > div`);

    let items = [];
    let listLinks = [];
    // loop por la pagina para guardar los titulos del trabajo y el link
    for (const productHandle of productHandles) {
      let name = 'Null';
      let company = 'Null';
      let location = 'Venezuela';
      let type = 'Null';
      let links = 'Null';
      let description = 'Null';
      let source = 'Bumeran'

      // pass the single handle below
      try {
        name = await page.evaluate(
          (el) => el.querySelector('h2').textContent,
          productHandle
        );
      } catch (error) { }

      try {
        company = await page.evaluate(
          (el) => el.querySelector('h3').textContent,
          productHandle
        );
      } catch (error) { }

      try {
        location = await page.evaluate(
          (el) =>
            el.querySelector(
              'a > div > div:nth-child(2) > div > div:nth-child(1) > h3'
            ).textContent,
          productHandle
        );
      } catch (error) { }

      try {
        type = await page.evaluate(
          (el) =>
            el.querySelector(
              'a > div > div:nth-child(2) > div > div:nth-child(2) > h3'
            ).textContent,
          productHandle
        );
      } catch (error) { }

      try {
        const link = await page.evaluate(
          (el) => el.querySelector('a').getAttribute('href'),
          productHandle
        );
        links = 'https://www.bumeran.com.ve' + link;
      } catch (error) { }

      //entrar a los links y extraer la descripcion
      //console.log("getting description of -----> " + links)
      const browserDesc = await puppeteer.launch({
        headless: true,
        timeout: 0,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        //defaultViewport: false,
        //dumpio: true
      });
      const pageDesc = await browserDesc.newPage();
      pageDesc.setDefaultNavigationTimeout(0);
      try {
        if (links == 'Null') {
          description = 'Null';
        } else {
          pageDesc.goto(links, {
            //waitUntil: 'load',
            // Remove the timeout
            //timeout: 0,
          });
          const resultsSelector = `[id="section-detalle"] > div:nth-child(2)`;
          await pageDesc.waitForSelector(resultsSelector);
          // Extract the results from the pageDesc.
          description = await pageDesc.evaluate((resultsSelector) => {
            return [...document.querySelectorAll(resultsSelector)].map(
              (anchor) => {
                const name = anchor.textContent.split('|')[0].trim();
                return `${name}`;
              }
            );
          }, resultsSelector);
          description = description[0];
        }
      } catch (error) { }
      //console.log("saving Job")
      if (name == 'Null') {
        continue;
      } else {
        items.push({ name, company, location, type, links, description, source });
        listLinks.push(links);
        await browserDesc.close()
      }
    }
    //console.log(items.name)
    console.log("Saving Jobs")
    saveJobs(listLinks, items);
    console.log('Jobs saved');

  } catch (e) {
    console.log(e)
    console.log("Internal Error in Bumeran Scraper")
  } finally {
    console.log("Closing Browser")
    browser.close();
    console.log("Browser closed")
    // console.log("Checking browser")
    // if (browser && browser.process() != null) browser.process().kill('SIGINT');
  }
  console.log('Busqueda Finalizada');
};

module.exports = { busquedaBumeran };