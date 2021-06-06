import { ElementHandle } from 'puppeteer';

export const takeHrefs = async (
  links: ElementHandle<Element>[] | undefined,
) => {
  try {
    const linksJson = await Promise.all(
      (links?.map((link) =>
        link.getProperty('href'),
      ) as unknown) as ElementHandle<Element>[],
    );

    return (await Promise.all(
      linksJson.map((href) => href.jsonValue()),
    )) as string[];
  } catch (error) {
    return error;
  }
};
