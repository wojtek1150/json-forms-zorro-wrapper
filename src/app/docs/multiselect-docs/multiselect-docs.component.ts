import { Component } from '@angular/core';
import { JsonSchema } from '@jsonforms/core';
import { JFZVerticalLayout, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';

@Component({
  selector: 'app-multiselect-docs',
  templateUrl: './multiselect-docs.component.html',
})
export class MultiselectDocsComponent {
  renderers = ngZorroRenderers;
  data = {};
  dataOne = {};
  dataCheck = {};

  schema: JsonSchema = {
    type: 'object',
    properties: {
      enum: {
        type: 'array',
        minItems: 2,
        maxItems: 4,
        uniqueItems: true,
        items: {
          type: 'string',
          enum: ['Solidity', 'Wasm', 'Go', ' C++', 'JavaScript', 'Python', 'Ruby'],
        },
      },
    },
  };

  uiSchema: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/enum',
        label: 'What programming languages are you most comfortable with?',
        options: {
          format: 'multiselect',
        },
      },
    ],
  };

  schemaOne: JsonSchema = {
    type: 'object',
    properties: {
      oneOf: {
        type: 'array',
        minItems: 2,
        maxItems: 4,
        uniqueItems: true,
        items: {
          type: 'string',
          oneOf: [
            {
              const: 'NONE',
              title: 'Never',
            },
            {
              const: 'DAILY',
              title: 'Daily',
            },
            {
              const: 'WEEKLY',
              title: 'Weekly',
            },
            {
              const: 'MONTLY',
              title: 'Monthly',
            },
          ],
        },
      },
    },
  };

  uiSchemaOne: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        label: 'Recurrence',
        type: 'Control',
        scope: '#/properties/oneOf',
        options: {
          format: 'multiselect',
        },
      },
    ],
  };

  schemaCheckbox: JsonSchema = {
    type: 'object',
    properties: {
      checkbox: {
        type: 'array',
        minItems: 2,
        maxItems: 4,
        uniqueItems: true,
        items: {
          type: 'string',
          enum: ['Solidity', 'Wasm', 'Go', ' C++', 'JavaScript', 'Python', 'Ruby'],
        },
      },
    },
  };

  uiSchemaCheckbox: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/checkbox',
        label: 'What programming languages are you most comfortable with?',
      },
    ],
  };
}
