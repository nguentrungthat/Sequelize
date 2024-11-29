// cd C:\Program Files\Google\Chrome\Application
// chrome --remote-debugging-port=9222 --allow-origin-remote=* --profile-directory=Scraping

// npm run tonitrus/capbleandkit

// npm install robotjs --ignore-scripts

const scrapeController = require("./controller/controller");
const [targetUrl, browserUrl] = process.argv.slice(2);
new scrapeController(targetUrl, browserUrl);
