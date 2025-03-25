import { fetchFullHtmlContent } from './html.scraping';

export const scrapeNews = async () => {
  const html = await fetchFullHtmlContent(
    `https://news.google.com/home?hl=es-419&gl=CL&ceid=CL:es-419`
  );
  return html;
};
