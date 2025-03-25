import axios from 'axios';

import createTunnelAgent from '@/lib/tunnel';

export const fetchFullHtmlContent = async (url: string): Promise<string> => {
  try {
    const response = await axios.get(url, {
      httpsAgent: createTunnelAgent(),
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; MyScraper/1.0)',
      },
    });

    // Devuelve directamente todo el contenido HTML recibido
    return response.data;
  } catch (error) {
    console.error('Error fetching content:', error);
    throw error;
  }
};
