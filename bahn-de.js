const puppeteer = require('puppeteer');
const screenshot = "bahn-de.png";

try{
(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  await page.goto('https://www.bahn.de/p/view/index.shtml');
  await page.setViewport({
    width: 1200,
    height: 800
});
 
  await page.type("input#js-auskunft-autocomplete-from", "München Hbf");
  await page.type("input#js-auskunft-autocomplete-to", "Passau Hbf");
  await page.waitFor(100);
  
  await page.click('input[name="date"]');
  await page.select('select[name="tariffTravellerReductionClass.1"]', "4");
  await page.click('input[class="btn pull-right js-submit-btn"]');

  await page.waitFor(1000);
  await autoScroll(page);
  await page.screenshot({ path: screenshot, fullPage: true });
  await page.close();

})();
} catch (err) {
  console.error(err)
}

// Source for autoScroll: https://github.com/chenxiaochun/blog/issues/38
async function autoScroll(page){
  await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
          var totalHeight = 0;
          var distance = 100;
          var timer = setInterval(() => {
              var scrollHeight = document.body.scrollHeight;
              window.scrollBy(0, distance);
              totalHeight += distance;

              if(totalHeight >= scrollHeight){
                  clearInterval(timer);
                  resolve();
              }
          }, 100);
      });
  });
}