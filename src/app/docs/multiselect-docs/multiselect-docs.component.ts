import { Component } from '@angular/core';
import { Config, JFZVerticalLayout, JsonFormsZorroModule, JsonSchema, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-multiselect-docs',
  templateUrl: './multiselect-docs.component.html',
  imports: [JsonFormsZorroModule, NzTableModule, NzAlertModule, JsonPipe]
})
export class MultiselectDocsComponent {
  renderers = ngZorroRenderers;
  data = {};
  dataOne = {};
  dataCheck = {};
  dataExternal = {};

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
          enum: ['Solidity', 'Wasm', 'Go', ' C++', 'JavaScript', 'Python', 'Ruby']
        }
      }
    }
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
          nzMaxTagCount: 2
        }
      }
    ]
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
              title: 'Never'
            },
            {
              const: 'DAILY',
              title: 'Daily'
            },
            {
              const: 'WEEKLY',
              title: 'Weekly'
            },
            {
              const: 'MONTLY',
              title: 'Monthly'
            }
          ]
        }
      }
    }
  };

  uiSchemaOne: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        label: 'Recurrence',
        type: 'Control',
        scope: '#/properties/oneOf',
        options: {
          format: 'multiselect'
        }
      }
    ]
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
          enum: ['Solidity', 'Wasm', 'Go', ' C++', 'JavaScript', 'Python', 'Ruby']
        }
      }
    }
  };

  uiSchemaCheckbox: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/checkbox',
        label: 'What programming languages are you most comfortable with?'
      }
    ]
  };

  schemaExternal: JsonSchema = {
    type: 'object',
    properties: {
      tags: {
        type: 'array',
        minItems: 2,
        maxItems: 3,
        uniqueItems: true,
        items: {
          type: 'string',
          enum: ['Anything to trigger validation']
        }
      }
    }
  };

  uiSchemaExternal: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        label: 'External',
        type: 'Control',
        scope: '#/properties/tags',
        options: {
          format: 'multiselect',
          dictionaryKey: 'tags'
        }
      }
    ]
  };

  jsonformsConfigExternal: Config = {
    multiselectExternalDictionary: {
      tags: [
        { label: 'foo', value: 'foo', unsupported: true, additionalLabel: 'unsupported', additionalLabelColor: 'var(--ant-error-color)' },
        { label: 'bar', value: 'bar', additionalLabel: 'recommended', additionalLabelColor: 'var(--ant-primary-color)' },
        { label: 'tar', value: 'tar' },
        { label: 'some', value: 'some', unsupported: true, additionalLabel: 'inactive', additionalLabelColor: 'var(--ant-error-color)' },
        { label: 'value', value: 'value' }
      ]
    }
  };
}
