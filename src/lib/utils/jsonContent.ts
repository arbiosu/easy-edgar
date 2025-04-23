// Thanks to https://github.com/w3cj/stoker/blob/main/src/openapi/helpers/json-content.ts
import type { z } from '@hono/zod-openapi';

// eslint-disable-next-line ts/ban-ts-comment
// @ts-expect-error
type ZodSchema = z.ZodUnion | z.AnyZodObject | z.ZodArray<z.AnyZodObject>;

const jsonContent = <T extends ZodSchema>(schema: T, description: string) => {
  return {
    content: {
      'application/json': {
        schema,
      },
    },
    description,
  };
};

export default jsonContent;
