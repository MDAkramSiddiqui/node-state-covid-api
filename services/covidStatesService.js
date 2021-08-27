const puppeteer = require('puppeteer');
const constants = require('../constants');
const logger = require('../utils/logger');

exports.getCovidStatesData = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(constants.global.COVID_STATES_DATA_URL);
    await page.waitForSelector('table.statetable tbody');

    const data = await page.evaluate(() => {
      // eslint-disable-next-line
      const tRowsObj = document.querySelector('table.statetable tbody').children;
      const tRows = Object.keys(tRowsObj).map((i) => tRowsObj[i]).slice(0, 36);
      const tRowsFiltered = tRows.map((row) => {
        const cols = Object.keys(row.children).map((c) => row.children[c]);
        return ({
          name: cols[1].innerText.trim(),
          active: cols[2].innerText.trim(),
          activeInc: cols[3].innerText.trim(),
          cured: cols[4].innerText.trim(),
          curedInc: cols[5].innerText.trim(),
          deaths: cols[6].innerText.trim(),
          deathsInc: cols[7].innerText.trim(),
        });
      });
      return tRowsFiltered;
    });
    await browser.close();
    return data;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};
