import { JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';

const schema: JsonSchema = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
    },
    lastName: {
      type: 'string',
    },
    comment: {
      type: 'string',
      description: 'Multiline Example',
    },
  },
  required: ['comment'],
};

const uiSchema = {
  type: 'Group',
  label: 'Personal Information',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/firstName',
      label: 'First Name',
    },
    {
      type: 'Control',
      scope: '#/properties/lastName',
      label: 'Last Name',
    },
    {
      type: 'Control',
      scope: '#/properties/comment',
      label: 'Enter comment',
      options: {
        multi: true,
        minRows: 3,
      },
    },
  ],
  options: {
    submitLabel: 'Publish comment',
  },
};

export const groupButton = { schema, uiSchema };
