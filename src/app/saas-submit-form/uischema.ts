export const uiSchema = {
  type: 'Categorization',
  elements: [
    {
      type: 'Category',
      label: 'General Info',
      elements: [
        {
          type: 'Group',
          label: 'Personal information',
          elements: [
            {
              type: 'Control',
              placeholder: 'Aaa',
              scope: '#/properties/firstName',
            },
            {
              type: 'Control',
              scope: '#/properties/lastName',
            },
            {
              type: 'Control',
              scope: '#/properties/email',
            },
            {
              type: 'Control',
              scope: '#/properties/city',
            },
            {
              type: 'Control',
              scope: '#/properties/date',
            },
          ],
        },
        {
          type: 'Group',
          label: 'Social',
          elements: [],
        },
      ],
    },
    {
      type: 'Category',
      label: 'About You',
      elements: [
        {
          type: 'Group',
          label: 'Bio',
          description:
            'This is your opportunity to make your application personal and expand upon what makes you YOU.\n' +
            'We love to hear about what you do, what you\'re passionate about, and why you\'re interested in the program. Take your time with these questions.',
          elements: [
            {
              type: 'Control',
              scope: '#/properties/bio',
              label: 'Please provide a short bio that describes who you are, what you do and what you\'re passionate about',
              placeholder: 'Textarea placeholder',
              description: 'Minimum 75 words or 2 minute video. You may choose to write this in your native language. You may also choose to write in the first ("I") or third ("She") person',
              options: {
                multi: true,
                minRows: 3,
              }
            },
          ],
        },
      ],
    },
    {
      type: 'Category',
      label: 'Community Impact',
      elements: [],
    },
    {
      type: 'Category',
      label: 'Technical Background',
      elements: [],
    },
    {
      type: 'Category',
      label: 'Experience',
      elements: [],
    },
    {
      type: 'Category',
      label: 'Final step',
      elements: [],
    },
  ],
  options: {
    variant: 'stepper',
    showNavButtons: false,
  },
};
