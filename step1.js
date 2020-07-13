'use strict';
const puppeteer = require('puppeteer');
const _ = require('lodash');

const urls = [
  'https://devblogs.microsoft.com/typescript/',
  'https://devblogs.microsoft.com/typescript/page/2/',
  'https://devblogs.microsoft.com/typescript/page/3/',
  'https://devblogs.microsoft.com/typescript/page/4/',
  'https://devblogs.microsoft.com/typescript/page/5/',
  'https://devblogs.microsoft.com/typescript/page/6/',
  'https://devblogs.microsoft.com/typescript/page/7/',
  'https://devblogs.microsoft.com/typescript/page/8/',
  'https://devblogs.microsoft.com/typescript/page/9/',
  'https://devblogs.microsoft.com/typescript/page/10/',
  'https://devblogs.microsoft.com/typescript/page/11/',
];

(async () => {
  const links = [];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  for (const url of urls) {

    try {
      console.log(url);
      await page.goto(url);

      links.push(...await page.evaluate(() => {
        // Note 1: here you can use querySelectorAll()
        // Note 2: eval can't return non-serializable data, so, you need to JSON.stringify() to receive objects.
        const links = document.querySelectorAll('a');
        const filteredLinks = [];
        for (const link of links) {
          const text = link.innerHTML;
          if (text.includes('Announcing TypeScript')) {
            if (!text.endsWith('Beta') &&
              !text.endsWith('RC') &&
              !text.endsWith('Alpha') &&
              !text.endsWith('CTP')) {
              filteredLinks.push({
                text: text,
                href: link.href,
              });
            }
          }
        }
        return filteredLinks;
      }));

      // await page.screenshot({ path: 'example.png' });
    }
    catch (error) {
      console.error(error);
    }

  }
  console.log(links);
  await browser.close();
})();
