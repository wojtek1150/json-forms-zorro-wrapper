import { JsonSchema } from '@jsonforms/core';

export const schema: JsonSchema = {
  type: 'object',
  properties: {
    firstName: {
      type: 'string',
      minLength: 3,
      errorMessage: 'Custom error message',
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
      minLength: 1,
    },
    date: {
      type: 'string',
      format: 'date',
    },
    social: {
      type: 'object',
      properties: {
        linkedin: {
          type: 'string',
        },
        twitter: {
          type: 'string',
        },
      },
      required: ['linkedin'],
    },
    bio: {
      type: 'string',
    },
    participant_gdg: {
      type: 'string',
      enum: ['Past', 'Active', 'N/A'],
    },
    participant_gdsc: {
      type: 'string',
      enum: ['Past', 'Active', 'N/A'],
    },
    participant_gde: {
      type: 'string',
      enum: ['Past', 'Active', 'N/A'],
    },
    active_participation: {
      type: 'string',
      enum: ['I confirm my active participation', 'I’m not able to confirm my active participation'],
    },
    role: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'string',
        enum: [
          'Event organizer: I organize events',
          'Public speaker: I speak at meetups, events, or conferences',
          'Content creator: I create content like blogs or videos',
          'Mentor: I mentor and educate others',
        ],
      },
    },
    expertise: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'string',
        enum: ['Hospitality', 'Energy/Oil & Gas', 'Finance/Banking', 'Gaming', 'Government/Not-for-Profit'],
      },
    },
    organize: {
      type: 'array',
      uniqueItems: true,
      items: {
        type: 'string',
        oneOf: [
          { const: 'foo', title: 'My Foo' },
          { const: 'bar', title: 'My Bar' },
          { const: 'foobar', title: 'My FooBar' },
        ],
      },
    },
    termsAndConditions: {
      type: 'boolean',
    },
    agreements: {
      type: 'boolean',
    },
  },
  required: ['firstName', 'lastName', 'email', 'city', 'bio', 'social.linkedin'],
};
