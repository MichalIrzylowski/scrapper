import puppeteer, { Page } from 'puppeteer';

export const visitWebsite = async (url: string): Promise<Page> => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1024 });
    await page.goto(url);

    return page;
  } catch (error) {
    return error;
  }
};
