import { createRouter } from '@/lib/create-app.js';
import { createRoute, z } from '@hono/zod-openapi';
import jsonContent from '@/lib/utils/jsonContent.js';

const router = createRouter().openapi(
  createRoute({
    method: 'get',
    path: '/',
    responses: {
      200: jsonContent(
        z.object({
          message: z.string(),
        }),
        'Easy Edgar API Index'
      ),
    },
  }),
  (c) => {
    return c.json({
      message: 'Easy Edgar API',
    });
  }
);

export default router;
