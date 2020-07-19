'use strict';
// const https = require('https');
// const fs = require('fs');
const puppeteer = require('puppeteer');
const _ = require('lodash');

const urls = [{
  text: 'Announcing TypeScript 3.9',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-3-9/'
},
{
  text: 'Announcing TypeScript 3.8',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-3-8/'
},
{
  text: 'Announcing TypeScript 3.7',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-3-7/'
},
{
  text: 'Announcing TypeScript 3.6',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-3-6/'
},
{
  text: 'Announcing TypeScript 3.5',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-3-5/'
},
{
  text: 'Announcing TypeScript 3.4',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-3-4/'
},
{
  text: 'Announcing TypeScript 3.3',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-3-3/'
},
{
  text: 'Announcing TypeScript 3.2',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-3-2/'
},
{
  text: 'Announcing TypeScript 3.1',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-3-1/'
},
{
  text: 'Announcing TypeScript 3.0',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-3-0/'
},
{
  text: 'Announcing TypeScript 2.9',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-2-9-2/'
},
{
  text: 'Announcing TypeScript 2.8',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-2-8-2/'
},
{
  text: 'Announcing TypeScript 2.7',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-2-7/'
},
{
  text: 'Announcing TypeScript 2.6',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-2-6/'
},
{
  text: 'Announcing TypeScript 2.5',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-2-5/'
},
{
  text: 'Announcing TypeScript 2.4',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-2-4/'
},
{
  text: 'Announcing TypeScript 2.3',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-2-3/'
},
{
  text: 'Announcing TypeScript 2.2',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-2-2/'
},
{
  text: 'Announcing TypeScript 2.1',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-2-1-2/'
},
{
  text: 'Announcing TypeScript 1.8',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-1-8-2/'
},
{
  text: 'Announcing TypeScript 1.7',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-1-7/'
},
{
  text: 'Announcing TypeScript 1.6',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-1-6-2/'
},
{
  text:
    'Announcing TypeScript 1.6 Beta: React/JSX, better error checking, and more',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-1-6-beta-reactjsx-better-error-checking-and-more/'
},
{
  text: 'Announcing TypeScript 1.5',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-1-5/'
},
{
  text: 'Announcing TypeScript 1.4',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-1-4/'
},
{
  text: 'Announcing TypeScript 1.3',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-1-3/'
},
{
  text: 'Announcing TypeScript 1.0.1',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-1-0-1/'
},
{
  text: 'Announcing TypeScript 1.0',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-1-0/'
},
{
  text: 'Announcing TypeScript 0.9.5',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-0-9-5/'
},
{
  text: 'Announcing TypeScript 0.9.1.1',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-0-9-1-1/'
},
{
  text: 'Announcing TypeScript 0.9.0.1',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-0-9-0-1/'
},
{
  text: 'Announcing TypeScript 0.9',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-0-9/'
},
{
  text: 'Announcing TypeScript 0.8.3.1',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-0-8-3-1/'
},
{
  text: 'Announcing TypeScript 0.8.3',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-0-8-3/'
},
{
  text: 'Announcing TypeScript 0.8.2',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-0-8-2/'
},
{
  text: 'Announcing TypeScript 0.8.1.1',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-0-8-1-1/'
},
{
  text: 'Announcing TypeScript 0.8.1',
  href: 'https://devblogs.microsoft.com/typescript/announcing-typescript-0-8-1/'
}];

(async () => {
  // const browser = await puppeteer.launch({ devtools: true });
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  for (const url of urls) {

    try {
      await page.goto(url.href);

      const date = await page.evaluate(() => {
        const nodes = document.querySelectorAll('.entry-meta');
        const filteredNodes = [];
        for (const node of nodes) {
          filteredNodes.push(node.innerText);
        }
        return filteredNodes;
      });

      const links = await page.evaluate(() => {
        const filteredNodes = [];
        let indentation = 1;

        function parseLiNodes() {
          for (const liNode of liNodes) {
            for (const childNode of liNode.children) {
              // filteredNodes.push(aNode.nodeName);
              if (childNode.nodeName === 'A') {
                filteredNodes.push({
                  href: childNode.getAttribute('href'),
                  text: childNode.innerText,
                  indentation: indentation,
                });
              }
              else if (childNode.nodeName === 'UL') {
                // indentation++;
                // parseLiNodes(childNode.querySelectorAll('li'));
                // indentation--;
              }
            }
          }
        }

        // Use a selector that only queries the first level of LI elements
        const liNodes = document.querySelectorAll('#main div > ul > li');
        parseLiNodes(liNodes);
        return filteredNodes;
      });

      console.log(`* [${url.text}](${url.href}) ${date}`);
      // console.log(ul);
      for (const link of links) {
        if (link.href.startsWith('#')) {
          console.log(`${'    '.repeat(link.indentation)}* [${link.text}](${link.href})`);
        }
      }
    }
    catch (error) {
      console.error(error);
    }
  }
  await browser.close();
})();
