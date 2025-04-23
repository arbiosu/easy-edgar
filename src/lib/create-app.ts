import { OpenAPIHono } from '@hono/zod-openapi';
import { logger } from 'hono/logger';
import serveEmojiFavicon from '@/middlewares/serve-emoji-favicon.js';

export function createRouter() {
  return new OpenAPIHono({
    strict: false,
    defaultHook: (result, c) => {
      if (!result.success) {
        return c.json(
          {
            error: result.error,
            message: 'Validation error',
          },
          422
        );
      }
    },
  });
}

export default function createApp() {
  const app = createRouter();
  app.use(logger());
  app.use(serveEmojiFavicon('📈'));

  app.notFound((c) => {
    return c.json(
      {
        message: `404 Not Found - ${c.req.path}`,
      },
      400
    );
  });

  app.onError((err, c) => {
    console.error('Error: ', err);
    return c.json(
      {
        message: `500 Internal Server Error`,
      },
      500
    );
  });

  return app;
}
