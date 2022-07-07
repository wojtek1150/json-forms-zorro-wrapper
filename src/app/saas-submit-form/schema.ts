import { JsonSchema } from '@jsonforms/core';

export const schema: JsonSchema = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      minLength: 3,
    },
    lastName: {
      type: 'string',
      minLength: 3,
    },
    email: {
      type: 'string',
      minLength: 3,
    },
    city: {
      type: 'string',
      enum: ['Kraków', 'Wien', 'London', 'San Francisco', 'Venice', 'Other'],
    },
    date: {
      type: 'string',
      format: 'date',
    },
    bio: {
      type: 'string',
    },
  },
  required: ['firstName', 'lastName', 'email', 'city', 'bio'],
};
