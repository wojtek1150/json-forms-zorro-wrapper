import { Config } from '@wojtek1150/jsonforms-zorro-wrapper';

export const formData = {
  firstName: 'Jane',
  lastName: 'Doe',
  personalDetails: {
    bio: '<p>Lorem<a href="http://google.com" rel="noopener noreferrer" target="_blank">Ipsum</a></p>',
  },
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
        name: 'Lucy Green',
        email: 'lucy.green@gmail.com',
      },
      {
        name: 'John Smith',
        email: 'smith@gmail.com',
        avatar: 'https://i.pravatar.cc/400?img=52',
      },
    ],
  },
};
