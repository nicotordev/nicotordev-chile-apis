import { fetchFullHtmlContent } from './html.scraping';

export const scrapeNews = async (target: string) => {
  const html = await fetchFullHtmlContent(target);
  return html;
};
