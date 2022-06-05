import { JsonSchema } from '@jsonforms/core';

export const schema: JsonSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string'
    },
    vegetarian: {
      type: 'boolean'
    },
    birthDate: {
      type: 'string',
      format: 'date'
    },
    personalData: {
      type: 'object',
      properties: {
        age: {
          type: 'integer'
        }
      },
      additionalProperties: true,
      required: [
        'age'
      ]
    },
    postalCode: {
      type: 'string'
    }
  },
  additionalProperties: true,
  required: [
    'name',
    'vegetarian',
    'birthDate',
    'personalData',
    'postalCode'
  ]
};
