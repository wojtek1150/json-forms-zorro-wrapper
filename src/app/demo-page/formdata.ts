import { Config } from '@wojtek1150/jsonforms-zorro-wrapper';

export const formData = {
  bio: 'Lorem Ipsum',
  vegetarian: false,
  birthDate: '2022-06-01',
  personalData: {
    age: 34,
  },
  nationality: 'DE',
  toggle: true,
  slider: 2,
  enum: 'Two',
};

export const jsonformsConfig: Config = {
  multiselectExternalDictionary: {
    tags: ['foo', 'bar', 'tar'].map(label => ({ label, value: label })),
  },
};
