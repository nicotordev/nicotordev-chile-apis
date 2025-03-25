import tunnel from 'tunnel';

const createTunnelAgent = () =>
  tunnel.httpsOverHttp({
    proxy: {
      host: process.env.BRD_PROXY_HOST,
      port: parseInt(process.env.BRD_PROXY_PORT),
      proxyAuth: process.env.BRD_PROXY_AUTH,
    },
    rejectUnauthorized: false,
  });

export default createTunnelAgent;
