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
  mentionField: ['jane.doe@gmail.com'],
};

export const jsonformsConfig: Config = {
  multiselectExternalDictionary: {
    tags: ['foo', 'bar', 'tar'].map(label => ({ label, value: label })),
  },
  mentionDictionary: {
    users: [
      {
        name: 'John Doe',
        email: 'john.doe@gmail.com',
        avatar: 'https://i.pravatar.cc/400?img=50',
      },
      {
        name: 'Jane Doe',
        email: 'jane.doe@gmail.com',
        avatar: 'https://i.pravatar.cc/400?img=51',
      },
      {
        name: 'John Smith',
        email: 'smith@gmail.com',
        avatar: 'https://i.pravatar.cc/400?img=52',
      },
    ],
  },
};
