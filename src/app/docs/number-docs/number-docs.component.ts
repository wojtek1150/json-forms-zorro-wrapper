import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ControlDocsAbstract } from '../control-docs.abstract';
import { EditorFormatterPipe } from '../../pipes/editor-formatter.pipe';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-number-docs',
  templateUrl: './number-docs.component.html',
  imports: [JsonFormsZorroModule, NzTableModule, EditorFormatterPipe, NzCodeEditorModule, FormsModule],
})
export class NumberDocsComponent extends ControlDocsAbstract {
  schema = null;
  uiSchema = null;

  override dataObjects: Record<string, any> = {
    dataAge: {},
  };

  override schemaObjects: Record<string, JsonSchema> = {
    schemaAge: {
      type: 'object',
      properties: {
        age: {
          type: 'number',
          minimum: 3,
          maximum: 50,
          multipleOf: 1,
        },
      },
    },
  };

  override uiSchemaObjects: Record<string, JFZVerticalLayout> = {
    uiSchemaAge: {
      type: 'VerticalLayout',
      elements: [
        {
          label: 'Age',
          type: 'Control',
          scope: '#/properties/age',
        },
      ],
    },
  };
}
