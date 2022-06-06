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
      }
    },
    {
      type: 'Control',
      scope: '#/properties/vegetarian'
    },
    {
      type: 'Control',
      scope: '#/properties/personalData'
    },
    {
      type: 'Control',
      scope: '#/properties/toggle',
      label: 'Boolean as Toggle',
      options: {
        toggle: true
      }
    },
    {
      type: 'Control',
      scope: '#/properties/slider',
      options: {
        slider: true
      }
    },
    {
      type: 'Control',
      scope: '#/properties/enum'
    }
  ]
};
