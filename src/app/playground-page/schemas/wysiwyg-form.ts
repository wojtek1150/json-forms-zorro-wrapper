import { JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';

const schema: JsonSchema = {
  additionalProperties: false,
  required: ['title', 'bio', 'description', 'description_plain_text', 'duration'],
  type: 'object',
  properties: {
    title: {
      minLength: 3,
      maxLength: 200,
      type: 'string',
      errorMessage: 'This field is required and can be between 3 and 200 characters.',
    },
    bio: {
      maxLength: 200,
      type: 'string',
      errorMessage: 'This field is required and can be at most 200 characters.',
    },
    description: {
      maxLength: 20000,
      type: 'string',
      errorMessage: 'This field is required and can be at most 20000 characters.',
    },
    description_plain_text: {
      maxLength: 2000,
      type: 'string',
      errorMessage: 'This field is required and can be at most 2000 characters.',
    },
    notes: {
      maxLength: 200,
      type: 'string',
      errorMessage: 'This field can be at most 200 characters.',
    },
    duration: {
      enum: ['Full-day event', 'Half-day event', 'Multiple days event', 'Evening event', 'Other'],
      type: 'string',
      errorMessage: 'This field is required.',
    },
  },
};

const uiSchema = {
  type: 'VerticalLayout',
  label: 'Event details',
  options: {
    submitLabel: 'Submit',
  },
  elements: [
    {
      scope: '#/properties/title',
      label: 'What was the title of your event?',
      type: 'Control',
    },
    {
      scope: '#/properties/bio',
      label: 'Biography',
      options: {
        wysiwyg: true,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['link'],
          [
            {
              list: 'ordered',
            },
            {
              list: 'bullet',
            },
          ],
        ],
        formats: ['bold', 'italic', 'underline', 'strike', 'link', 'list'],
      },
      type: 'Control',
    },
    {
      scope: '#/properties/description',
      label: 'What was it about?',
      options: {
        wysiwyg: true,
        withStringValidation: true,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['link'],
          [
            {
              list: 'ordered',
            },
            {
              list: 'bullet',
            },
          ],
        ],
        formats: ['bold', 'italic', 'underline', 'strike', 'link', 'list'],
      },
      type: 'Control',
    },
    {
      scope: '#/properties/duration',
      label: 'Duration',
      options: {
        format: 'radio-button',
      },
      type: 'Control',
    },
    {
      scope: '#/properties/notes',
      label: 'Additional notes',
      options: {
        wysiwyg: true,
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['link'],
          [
            {
              list: 'ordered',
            },
            {
              list: 'bullet',
            },
          ],
        ],
        formats: ['bold', 'italic', 'underline', 'strike', 'link', 'list'],
      },
      type: 'Control',
    },
  ],
};
export const wysiwygForm = { schema, uiSchema };
