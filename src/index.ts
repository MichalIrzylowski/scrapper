import { ElementHandle } from 'puppeteer';
import { visitWebsite } from './utils/visit-webiste';
import { takeHrefs } from './utils/take-hrefs';
import { asyncForEach } from './utils/async-for-each';

const xkom = {
  url: 'https://www.x-kom.pl/',
};

const helloWorld = async () => {
  try {
    // taking links from menu
    const xkomPage = await visitWebsite(xkom.url);
    const nav = await xkomPage.$('nav');
    const links = await nav?.$$('a[aria-haspopup="true"]');
    const mainMenuHrefs = await takeHrefs(links);

    // taking links from each submenu
    await asyncForEach(mainMenuHrefs, async (href: string, index: number) => {
      await xkomPage.goto(href);

      const menu = await (
        (await (await xkomPage.$('h3'))?.$x('..')) as ElementHandle<Element>[]
      )[0].$('ul');

      const submenu = ((await menu?.$$('li')) as ElementHandle<Element>[])[
        index
      ];

      const subMenuHrefs = await takeHrefs(await submenu.$$('a'));
      subMenuHrefs.shift();

      // visiting the listing page and go to each of them
      await asyncForEach(subMenuHrefs, async (subMenuHref: string) => {
        let productLinks: string[] = [];
        let condition = true;
        let page = 1;

        while (condition) {
          await xkomPage.goto(`${subMenuHref}?page=${page}&per_page=90`);

          const tiles = await xkomPage.$$('#listing-container > div');
          const headings = await Promise.all([
            ...tiles.map((tile) => tile.$('h3')),
          ]);
          if (!headings.length) {
            condition = false;
          }
          const listingContainerLinks = (
            await Promise.all([...headings.map((heading) => heading?.$x('..'))])
          ).flat();
          const listingContainerHrefs = await takeHrefs(
            listingContainerLinks as ElementHandle<Element>[],
          );

          productLinks = [...productLinks, ...listingContainerHrefs];

          console.log(subMenuHref, page, productLinks.length);
          page++;
        }

        await asyncForEach(productLinks, async (productLink, linkNo) => {
          await xkomPage.goto(productLink);

          await xkomPage.screenshot({ path: `test[${linkNo}].jpg` });
        });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

helloWorld();
