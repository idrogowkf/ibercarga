import { createRequire } from 'node:module';
import process from 'node:process';
import { createServer, loadEnv } from 'vite';

const require = createRequire(import.meta.url);
Object.assign(process.env, loadEnv('development', process.cwd(), ''));
const sendQuote = require('../api/send-quote.js');

const port = Number(process.env.PORT || 5173);
const host = process.env.HOST || 'localhost';

const server = await createServer({
  server: { host, port },
  plugins: [{
    name: 'vercel-api-local',
    configureServer(viteServer) {
      viteServer.middlewares.use(async (request, response, next) => {
        const pathname = new URL(request.url, 'http://localhost').pathname;
        if (pathname !== '/api/send-quote') {
          next();
          return;
        }

        try {
          await sendQuote(request, response);
        } catch (error) {
          next(error);
        }
      });
    },
  }],
});

await server.listen();
server.printUrls();
