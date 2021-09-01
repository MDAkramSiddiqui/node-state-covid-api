const path = require('path');
const puppeteer = require('puppeteer');
const constants = require('../constants');
const logger = require('../utils/logger');

const scriptName = path.basename(__filename);

exports.getCovidStatesData = async () => {
  logger.debug(scriptName, 'getCovidStatesData()');
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    logger.debug(scriptName, 'init puppeteer browser window');

    await page.goto(constants.global.COVID_STATES_DATA_URL);
    await page.waitForSelector('table.statetable tbody');

    logger.info(scriptName, 'init scrapping data');
    const data = await page.evaluate(() => {
      // eslint-disable-next-line
      const tRowsObj = document.querySelector('table.statetable tbody').children;
      const tRows = Object.keys(tRowsObj).map((i) => tRowsObj[i]).slice(0, 36);
      const tRowsFiltered = tRows.map((row) => {
        const cols = Object.keys(row.children).map((c) => row.children[c]);
        return ({
          name: cols[1].innerText.trim(),
          active: {
            total: +cols[2].innerText.trim(),
            changes: +cols[3].innerText.trim(),
            isIncreased: cols[3].children[0].className !== 'down',
          },
          cured: {
            total: +cols[4].innerText.trim(),
            changes: +cols[5].innerText.trim(),
            isIncreased: true,
          },
          death: {
            total: +cols[6].innerText.trim(),
            changes: +cols[7].innerText.trim(),
            isIncreased: true,
          },
        });
      });
      return tRowsFiltered;
    });

    logger.info(scriptName, 'data scrapping success');
    await browser.close();
    logger.debug(scriptName, 'closing puppeteer browser window');
    return data;
  } catch (err) {
    logger.error(scriptName, err);
    throw err;
  }
};
