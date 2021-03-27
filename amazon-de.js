const puppeteer = require('puppeteer');
const screenshot = "bahn-de.png";

try{
(async () => {
  const browser = await puppeteer.launch({headless: false});
  const page = await browser.newPage();
  
  await page.goto('https://www.amazon.de/');
  await page.setViewport({
    width: 1200,
    height: 800
});
 
  await page.type("input#twotabsearchtextbox", "kaffeemaschine espresso");
  await page.click("input#nav-search-submit-button")

  // Amazon block bot testing like this. 
  // End test
 
})();
} catch (err) {
  console.error(err)
}
