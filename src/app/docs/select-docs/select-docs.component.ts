import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';
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
  schema = null;
  uiSchema = null;

  override dataObjects: Record<string, any> = {
    dataEnum: {},
    dataOneOf: {},
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
  };
}
