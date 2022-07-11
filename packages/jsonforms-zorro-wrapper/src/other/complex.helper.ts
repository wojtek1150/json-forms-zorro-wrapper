import { JsonSchema } from '@jsonforms/core';

export const hasOneOfItems = (schema: JsonSchema): boolean =>
  schema.oneOf !== undefined &&
  schema.oneOf.length > 0 &&
  (schema.oneOf as JsonSchema[]).every((entry: JsonSchema) => {
    return entry.const !== undefined;
  });

export const hasEnumItems = (schema: JsonSchema): boolean => schema.type === 'string' && schema.enum !== undefined;
