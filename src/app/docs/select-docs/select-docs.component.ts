import { Component } from '@angular/core';
import { Config, JFZVerticalLayout, JsonFormsZorroModule, JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ControlDocsAbstract } from '../control-docs.abstract';
import { EditorFormatterPipe } from '../../pipes/editor-formatter.pipe';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-docs',
  templateUrl: './select-docs.component.html',
  imports: [JsonFormsZorroModule, NzTableModule, NzCodeEditorModule, FormsModule, EditorFormatterPipe],
})
export class SelectDocsComponent extends ControlDocsAbstract {
  override dataObjects: Record<string, any> = {
    dataEnum: {},
    dataOneOf: {},
    dataEnumObjects: { selection: { name: 'Red Car', color: 'red' } },
    dataEnumObjectsExternal: { enumObjectsExternal: { name: 'Blue Car', color: 'blue' } },
  };

  override schemaObjects: Record<string, JsonSchema> = {
    schemaEnum: {
      type: 'object',
      properties: {
        enum: {
          type: 'string',
          enum: ['Never', 'Daily', 'Weekly', 'Monthly'],
        },
      },
    },
    schemaEnumObjects: {
      type: 'object',
      additionalProperties: false,
      properties: {
        selection: {
          type: 'object',
          additionalProperties: false,
          properties: {
            name: { type: 'string' },
            color: { type: 'string' },
          },
          enum: [
            { name: 'Red Car', color: 'red' },
            { name: 'Blue Car', color: 'blue' },
          ],
        },
      },
      required: ['selection'],
    },
    schemaOneOf: {
      type: 'object',
      properties: {
        oneOf: {
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
    schemaEnumObjectsExternal: {
      type: 'object',
      properties: {
        enumObjectsExternal: {
          type: 'object',
          additionalProperties: false,
          properties: {
            name: { type: 'string' },
            color: { type: 'string' },
          },
          enum: [{ name: 'foo', color: 'bar' }],
        },
      },
    },
  };

  override uiSchemaObjects: Record<string, JFZVerticalLayout> = {
    uiSchemaEnum: {
      type: 'VerticalLayout',
      elements: [
        {
          label: 'Recurrence as Enum',
          type: 'Control',
          scope: '#/properties/enum',
        },
      ],
    },
    uiSchemaEnumObjects: {
      type: 'VerticalLayout',
      elements: [
        {
          label: 'Enum as object',
          type: 'Control',
          scope: '#/properties/selection',
          options: {
            labelKey: 'name',
          },
        },
      ],
    },
    uiSchemaOneOf: {
      type: 'VerticalLayout',
      elements: [
        {
          label: 'Recurrence as One of',
          type: 'Control',
          scope: '#/properties/oneOf',
        },
      ],
    },
    uiSchemaEnumObjectsExternal: {
      type: 'VerticalLayout',
      elements: [
        {
          label: 'Enum as object',
          type: 'Control',
          scope: '#/properties/enumObjectsExternal',
          options: {
            format: 'select',
            dictionaryKey: 'enumObjectsExternal',
          },
        },
      ],
    },
  };

  override configObjects: Record<string, Config> = {
    jsonformsConfigExternal: {
      selectExternalDictionary: {
        enumObjectsExternal: [
          { label: 'Red Car', value: { name: 'Red Car', color: 'red' } },
          { label: 'Blue Car', value: { name: 'Blue Car', color: 'blue' } },
        ],
      },
    },
  };
}
