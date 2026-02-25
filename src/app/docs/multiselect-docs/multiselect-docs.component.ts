import { Component } from '@angular/core';
import { Config, JFZVerticalLayout, JsonFormsZorroModule, JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { FormsModule } from '@angular/forms';
import { ControlDocsAbstract } from '../control-docs.abstract';
import { EditorFormatterPipe } from '../../pipes/editor-formatter.pipe';

@Component({
  selector: 'app-multiselect-docs',
  templateUrl: './multiselect-docs.component.html',
  imports: [JsonFormsZorroModule, NzTableModule, NzAlertModule, NzCodeEditorModule, FormsModule, EditorFormatterPipe],
})
export class MultiselectDocsComponent extends ControlDocsAbstract {
  schema = null;
  uiSchema = null;

  override dataObjects: Record<string, any> = {
    dataEnum: {},
    dataOneOf: {},
    dataCheckbox: {},
    dataExternal: {},
  };

  override schemaObjects: Record<string, JsonSchema> = {
    schemaEnum: {
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
    },
    schemaOneOf: {
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
    },
    schemaCheckbox: {
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
    },
    schemaExternal: {
      type: 'object',
      properties: {
        tags: {
          type: 'array',
          minItems: 2,
          maxItems: 3,
          uniqueItems: true,
          items: {
            type: 'string',
            enum: ['Anything to trigger validation'],
          },
        },
      },
    },
  };

  override uiSchemaObjects: Record<string, JFZVerticalLayout> = {
    uiSchemaEnum: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/enum',
          label: 'What programming languages are you most comfortable with?',
          options: {
            format: 'multiselect',
            nzMaxTagCount: 2,
          },
        },
      ],
    },
    uiSchemaOneOf: {
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
    },
    uiSchemaCheckbox: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/checkbox',
          label: 'What programming languages are you most comfortable with?',
        },
      ],
    },
    uiSchemaExternal: {
      type: 'VerticalLayout',
      elements: [
        {
          label: 'External',
          type: 'Control',
          scope: '#/properties/tags',
          options: {
            format: 'multiselect',
            dictionaryKey: 'tags',
          },
        },
      ],
    },
  };

  jsonformsConfigExternal: Config = {
    multiselectExternalDictionary: {
      tags: [
        { label: 'foo', value: 'foo', unsupported: true, additionalLabel: 'unsupported', additionalLabelColor: 'var(--ant-error-color)' },
        { label: 'bar', value: 'bar', additionalLabel: 'recommended', additionalLabelColor: 'var(--ant-primary-color)' },
        { label: 'tar', value: 'tar' },
        { label: 'some', value: 'some', unsupported: true, additionalLabel: 'inactive', additionalLabelColor: 'var(--ant-error-color)' },
        { label: 'value', value: 'value' },
      ],
    },
  };
}
