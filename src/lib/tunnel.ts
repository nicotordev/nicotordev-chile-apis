import { HttpsProxyAgent, HttpsProxyAgentOptions } from 'https-proxy-agent';

const createProxyAgent = () => {
  // Construye la URL del proxy
  const proxyUrl = `http://${process.env.BRD_PROXY_HOST}:${process.env.BRD_PROXY_PORT}`;
  const proxyAuth = `${process.env.BRD_PROXY_AUTH}`;

  // Configura las opciones del agente
  const agentOptions: HttpsProxyAgentOptions<string> | undefined = {
    rejectUnauthorized: false, // Acepta certificados autofirmados
    ca: process.env.BRD_CRT_CA_BASE64
      ? [Buffer.from(process.env.BRD_CRT_CA_BASE64, 'base64')]
      : undefined,
    headers: {
      'Proxy-Authentication': 'Basic ' + new Buffer(proxyAuth).toString('base64'),
    },
  };

  // Crea el agente proxy
  const agent = new HttpsProxyAgent(proxyUrl, agentOptions);

  return agent;
};

export default createProxyAgent;
