import { JsonSchema } from '@jsonforms/core';

const schema: JsonSchema = {
  properties: {
    comments: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: {
            type: 'string',
          },
        },
        required: ['name'],
      },
    },
  },
};

const uiSchema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/comments',
    },
  ],
};
export const itemArray = { schema, uiSchema };
