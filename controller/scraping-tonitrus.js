const DataModel = require("../models/model");
const dataModel = new DataModel();

/**
 * @param {connection browser} browser // puppeteer.connect
 * @param {string} url
 */
const scraper = async ({ browser, url = "" }) => {
	try {
	
		const page = await browser.newPage();
		const searchResultSelector = "ul.navigation--list.container";

		// Navigate the page to a URL
		await page.goto(url, {
			waitUntil: "networkidle2",
		});

		// Wait
		await page.waitForSelector(searchResultSelector);

		const arrayLinkCate = await page.$$eval("ul.navigation--list.container > li.navigation--entry a.navigation--link", (nodes) =>
			nodes.map((node) => node.href)
		);

		if (arrayLinkCate?.length > 1) {
			const limitedLinks = arrayLinkCate.slice(1, 3);
			for (const linkCate of limitedLinks) {
				if (!linkCate) continue;
				try {
					const newPage = await browser.newPage();
					getProduct(newPage, linkCate);
				} catch (e) {
					console.error("Link Category Error", linkCate, e.message);
					continue;
				}
			}
		}
		await page.close();
		// await browser.close();
	} catch (e) {
		console.log("Error scraper: ", e);
	}
};

/**
 * @param {page} page
 * @param {string} linkCate
 * @param {number} pageNumber //Page to get list product
 */
async function getProduct(page, linkCate, pageNumber = 1) {
	const pageLink = linkCate + "?p=" + pageNumber + "&o=2&n=12";

	await page.goto(pageLink, { waitUntil: "networkidle2" });

	const listProduct = await page.$$eval("div.product--info-area > a.product--title", (nodes) => nodes.map((node) => node.href));

	for (const productLink of listProduct) {
		try {
			await scrapingProduct(page, productLink);
		} catch (e) {
			console.error(`Link ${productLink} ${e.message}`);
			continue;
		}
	}
	await page.close();
}

/**
 * @param {page} page
 * @param {string} productLink
 * @param {number} maxRetries //Times retries if connection fail
 */
async function scrapingProduct(page, productLink, maxRetries = 3) {
	for (let attempt = 1; attempt <= maxRetries; attempt++) {
		try {
			await page.goto(productLink, {
				waitUntil: "networkidle2",
			});

			const textNameProduct = await page.$eval("h1.product--title", (el) => el.textContent?.trim() || "");
			const [brand, model, ...nameParts] = textNameProduct.split(" - ");
			const nameProduct = nameParts.join(" ").trim();

			const arrImage = await page.$$eval("div.image--box.image-slider--item > span", (nodes) =>
				nodes.map((node) => node.getAttribute("data-img-large")).filter(Boolean)
			);
			dataModel.saveData(nameProduct, "tonitrus", arrImage);
			return;
		} catch (error) {
			console.error(`Attempt ${attempt} failed:`, error.message);
			if (attempt === maxRetries) {
				console.error(`Failed to load ${productLink} after ${maxRetries} attempts`);
				return;
			}
			// Wait before retrying
			await new Promise((resolve) => setTimeout(resolve, 2000 * attempt));
		}
	}
}

module.exports = scraper;
