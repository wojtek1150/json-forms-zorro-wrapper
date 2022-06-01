export const schema = {
  'type': 'object',
  'properties': {
    'name': {
      'type': 'string',
      'minLength': 3,
      'maxLength': 10,
      'description': 'Please enter your name'
    },
    'vegetarian': {
      'type': 'boolean'
    },
    'birthDate': {
      'type': 'string',
      'format': 'date'
    },
    'nationality': {
      'type': 'string',
      'enum': [
        'DE',
        'IT',
        'JP',
        'US',
        'RU',
        'Other'
      ]
    },
  },
  'required': [
    'name',
    'birthDate'
  ]
};
