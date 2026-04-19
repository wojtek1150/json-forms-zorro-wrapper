import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { RouterLink } from '@angular/router';
import { ControlDocsAbstract } from '../control-docs.abstract';
import { EditorFormatterPipe } from '../../pipes/editor-formatter.pipe';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-radio-docs',
  templateUrl: './radio-docs.component.html',
  imports: [JsonFormsZorroModule, NzTableModule, RouterLink, EditorFormatterPipe, NzCodeEditorModule, FormsModule],
})
export class RadioDocsComponent extends ControlDocsAbstract {
  override dataObjects: Record<string, any> = {
    dataStandard: { radio: 'Daily' },
    dataButton: { button: 'Daily' },
    dataOneOf: { oneOf: 'Daily' },
  };

  override schemaObjects: Record<string, JsonSchema> = {
    standardSchema: {
      type: 'object',
      properties: {
        radio: {
          type: 'string',
          enum: ['Never', 'Daily', 'Weekly', 'Monthly'],
        },
      },
    },
    buttonSchema: {
      type: 'object',
      properties: {
        button: {
          type: 'string',
          enum: ['Never', 'Daily', 'Weekly', 'Monthly'],
        },
      },
    },
    oneOfSchema: {
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
              const: 'MONTHLY',
              title: 'Monthly',
            },
          ],
        },
      },
    },
  };

  override uiSchemaObjects: Record<string, JFZVerticalLayout> = {
    standardUiSchema: {
      type: 'VerticalLayout',
      elements: [
        {
          label: 'Recurrence',
          type: 'Control',
          scope: '#/properties/radio',
          options: {
            format: 'radio',
          },
        },
      ],
    },
    buttonUiSchema: {
      type: 'VerticalLayout',
      elements: [
        {
          label: 'Recurrence',
          type: 'Control',
          scope: '#/properties/button',
          options: {
            format: 'radio-button',
          },
        },
      ],
    },
    oneOfUiSchema: {
      type: 'VerticalLayout',
      elements: [
        {
          label: 'Recurrence',
          type: 'Control',
          scope: '#/properties/oneOf',
          options: {
            format: 'radio-button',
          },
        },
      ],
    },
  };
}
