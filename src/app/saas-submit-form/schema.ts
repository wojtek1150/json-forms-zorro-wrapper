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
      enum: [
        'Kraków',
        'Wien',
        'London',
        'San Francisco',
        'Venice',
        'Other'
      ]
    },
    date: {
      type: 'string',
      format: 'date'
    },
    bio: {
      type: 'string',
      description: 'This is your opportunity to make your application personal and expand upon what makes you YOU.\n' +
        'We love to hear about what you do, what you\'re passionate about, and why you\'re interested in the program. Take your time with these questions.'
    },
  }
};
