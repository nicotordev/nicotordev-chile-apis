import tunnel from 'tunnel';

import { decodeBase64 } from '@/utils/crypto.util';

const createTunnelAgent = () => {
  tunnel.httpsOverHttp({
    proxy: {
      host: process.env.BRD_PROXY_HOST,
      port: parseInt(process.env.BRD_PROXY_PORT),
      proxyAuth: process.env.BRD_PROXY_AUTH,
    },
    rejectUnauthorized: process.env.NODE_ENV === 'production' ? false : true,
    ca: [Buffer.from(decodeBase64(process.env.BRD_CRT_CA_BASE64))],
  });
};

export default createTunnelAgent;
