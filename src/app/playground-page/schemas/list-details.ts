import { JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';

const schema: JsonSchema = {
  type: 'object',
  properties: {
    users: {
      type: 'array',
      items: {
        type: 'object',
        title: 'Users',
        properties: {
          firstname: {
            type: 'string',
          },
          lastname: {
            type: 'string',
          },
          email: {
            type: 'string',
            format: 'email',
          },
          age: {
            type: 'number',
            minimum: 0,
          },
        },
        required: ['firstname'],
      },
    },
  },
};

const uiSchema = {
  type: 'ListWithDetail',
  scope: '#/properties/users',
  options: {
    detail: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'HorizontalLayout',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/firstname',
              label: 'First Name',
            },
            {
              type: 'Control',
              scope: '#/properties/lastname',
              label: 'Last Name',
            },
          ],
        },
        {
          type: 'Control',
          scope: '#/properties/age',
          label: 'Age',
        },
        {
          type: 'Control',
          scope: '#/properties/email',
          label: 'Email',
        },
      ],
    },
  },
};

export const listDetails = { schema, uiSchema };
