const puppeteer = require('puppeteer');

function timeHash() {
  return new Date().getTime();
}

(async function() {
  const browser = await puppeteer.launch({
    // 正式用參數
    // args: ['--no-sandbox'], // 放在 Heroku 需要使用該參數
    // 測試用參數
    headless: false,
    defaultViewport: { width: 1920, height: 944 },
    args: [`--window-size=${1920},${944}`], // new option
    slowMo: 10,
  });

  const page = await browser.newPage();

  await page.goto('http://localhost:8088');

  await page.waitForSelector('.el-input__inner');

  await page.type("#app > div > form > div:nth-child(2) > div > div > input", 'jason01');
  await page.type("#app > div > form > div:nth-child(4) > div > div > input", 'aaaa1234');

  await page.click('#app > div > form > button');

  await page.waitForTimeout(3000);

  await page.click('#app > div > div:nth-child(2) > div.sidebar-container > div > div.scrollbar-wrapper.el-scrollbar__wrap.el-scrollbar__wrap--hidden-default > div > ul > div:nth-child(9) > li > div');

  await page.waitForTimeout(1000);

  await page.click('#app > div > div:nth-child(2) > div.sidebar-container > div > div.scrollbar-wrapper.el-scrollbar__wrap.el-scrollbar__wrap--hidden-default > div > ul > div:nth-child(9) > li > ul > div:nth-child(12) > li > div');

  await page.waitForTimeout(1000);

  await page.click('#app > div > div:nth-child(2) > div.sidebar-container > div > div.scrollbar-wrapper.el-scrollbar__wrap.el-scrollbar__wrap--hidden-default > div > ul > div:nth-child(9) > li > ul > div:nth-child(12) > li > ul > div:nth-child(3) > a > li');

  await page.waitForTimeout(1000);

  for(let i = 0; i < 100; i++) {
    await page.waitForTimeout(1000);
    await page.type('#app > div > div:nth-child(2) > div.main-container > section > div > div > div.buttonWrap_3SOL_ > div.tableBtn > form > div.right-one-block > div.el-input > input', 'jason01');
    await page.waitForTimeout(1000);
    await page.click('#app > div > div:nth-child(2) > div.main-container > section > div > div > div.buttonWrap_3SOL_ > div.tableBtn > form > div.right-two-block > div > button');
    console.log(`${i+1}次`);

    await page.waitForTimeout(5000);

    const newPage = (await browser.pages())[2];

    await newPage.waitForTimeout(2000);

    await newPage.screenshot({ path: `./parserScreenShot/${timeHash()}.png` });

    await newPage.close();

    // await page.bringToFront();
  }

  await browser.close();

})();

