const scraperTonitrus = require("./scraping-tonitrus");
const scraperCapbleandkit = require("./scraping-capbleandkit");
const puppeteer = require("puppeteer");

class Controller {
  constructor(targetUrl, browserUrl) {
    this._scrapeController(targetUrl, browserUrl);
  }

  _scrapeController = async (
    targetUrl = "tonitrus.com",
    browserURL = "http://localhost:9222/"
  ) => {
    try {
      switch (targetUrl) {
        case "tonitrus.com":
          let browser = await puppeteer.connect({
            browserURL,
          });
          await scraperTonitrus({ browser, url: "https://tonitrus.com/" });
          // const dataModel = new DataModel();
          // const data = await dataModel.getAllData(1, 10);
          // console.log("data: ", data);
          break;
        case "cablesandkits.com":
          let browserCable = await puppeteer.connect({
            browserURL,
          });
          await scraperCapbleandkit({
            browser: browserCable,
            url: "https://cablesandkits.com/",
          });
          break;
        default:
          break;
      }
    } catch (e) {
      console.log("Error controller: ", e);
    }
  };
}

module.exports = Controller;
