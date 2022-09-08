export const uischema = {
  type: 'VerticalLayout',
  elements: [
    {
      type: 'Control',
      scope: '#/properties/name',
    },
    {
      type: 'Control',
      scope: '#/properties/bio',
      options: {
        multi: true,
        minRows: 3,
      },
    },
    {
      type: 'Control',
      scope: '#/properties/vegetarian',
    },
    {
      type: 'Control',
      scope: '#/properties/personalData',
    },
    {
      type: 'Control',
      scope: '#/properties/toggle',
      label: 'Boolean as Toggle',
      options: {
        toggle: true,
      },
    },
    {
      type: 'Control',
      scope: '#/properties/slider',
      options: {
        slider: true,
      },
    },
    {
      type: 'Control',
      scope: '#/properties/enum',
    },
    {
      type: 'Control',
      scope: '#/properties/programmingLanguages',
      label: 'What programming languages are you most comfortable with?',
      description: 'Please select at least 2 from the list.',
    },
  ],
  options: {
    submitLabel: 'Submit',
  },
};
