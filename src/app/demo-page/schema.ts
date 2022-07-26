import { JsonSchema } from '@jsonforms/core';

export const schema: JsonSchema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    bio: {
      type: 'string',
      description: 'Multiline Example',
    },
    vegetarian: {
      type: 'boolean',
    },
    personalData: {
      type: 'object',
      properties: {
        birthDate: {
          type: 'string',
          format: 'date',
        },
        age: {
          title: 'Age',
          description: 'Age',
          type: 'integer',
        },
        height: {
          minimum: 1,
          multipleOf: 1e-2,
          title: 'Height',
          type: 'number',
        },
      },
      additionalProperties: true,
      required: ['age'],
    },
    toggle: {
      type: 'boolean',
      description: 'The "toggle" option renders boolean values as a toggle.',
    },
    slider: {
      type: 'number',
      minimum: 1,
      maximum: 5,
      default: 2,
      description: 'Slider Example',
    },
    enum: {
      type: 'string',
      enum: ['One', 'Two', 'Three'],
    },
  },
  additionalProperties: true,
  required: ['name', 'vegetarian', 'birthDate', 'personalData', 'postalCode'],
};
