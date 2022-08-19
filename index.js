

const puppeteer = require('puppeteer-extra');
// add stealth plugin and use defaults (all evasion techniques)
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
require('dotenv').config();

puppeteer.use(StealthPlugin())
puppeteer.launch({ headless: false }).then(async browser => {
  console.log('Running tests..')
  const user = process.env.USERX;
  const password = process.env.PASSWORD;
  const page = await browser.newPage()
  await page.goto('https://accounts.google.com/signin/v2/identifier?service=wise&passive=1209600&osid=1&continue=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fu%2F0%2F%3Fusp%3Ddirect_url&followup=https%3A%2F%2Fdocs.google.com%2Fspreadsheets%2Fu%2F0%2F%3Fusp%3Ddirect_url&ltmpl=sheets&flowName=GlifWebSignIn&flowEntry=ServiceLogin')
  // await page.waitForTimeout(5000)
  await page.type('#identifierId', user);
  const elements = await page.$x('//*[@id="identifierNext"]/div/button');
  await elements[0].click() ;
  await page.waitForSelector('input[type="password"]', { visible: true });
  await page.type('input[type="password"]', password);
  const element2 = await page.$x('//*[@id="passwordNext"]/div/button');
  await element2[0].click() ;
  // await browser.close()
  console.log(`All done. ✨`)
})

