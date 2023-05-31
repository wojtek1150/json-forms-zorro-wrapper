import { JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';

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
          message: {
            type: 'string',
            minLength: 10,
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
      options: {
        elementLabelProp: 'name',
        detail: {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              label: '',
              scope: '#/properties/name',
            },
            {
              type: 'Control',
              label: '',
              scope: '#/properties/message',
            },
          ],
        },
      },
    },
  ],
};
export const array = { schema, uiSchema };
