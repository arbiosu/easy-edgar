import type { AppOpenAPI } from './types.js';
import { Scalar } from '@scalar/hono-api-reference';

export default function configureOpenAPI(app: AppOpenAPI) {
  app.doc('/doc', {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Easy Edgar API',
    },
  });

  app.get(
    '/reference',
    Scalar({
      url: '/doc',
      defaultHttpClient: {
        targetKey: 'js',
        clientKey: 'fetch',
      },
      theme: 'moon',
    })
  );
}
