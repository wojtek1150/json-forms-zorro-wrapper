export const uischema = {
  type: "Categorization",
  elements: [
    {
      type: "Category",
      label: "General Info",
      elements: [
        {
          type: "Control",
          placeholder: "Aaa",
          scope: "#/properties/firstName"
        },
        {
          type: "Control",
          scope: "#/properties/lastName"
        },
        {
          type: "Control",
          scope: "#/properties/email"
        },
        {
          type: 'Control',
          scope: '#/properties/city'
        },
        {
          type: 'Control',
          scope: '#/properties/date'
        },
      ]
    },
    {
      type: "Category",
      label: "About You",
      elements: [
        {
          type: 'Control',
          scope: '#/properties/bio'
        },
      ],
    },
  ],
  options: {
    variant: "stepper",
    showNavButtons: false
  }
}
