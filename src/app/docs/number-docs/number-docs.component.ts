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
  schema: JsonSchema = {
    type: 'object',
    properties: {
      age: {
        type: 'number',
        minimum: 3,
        maximum: 50,
        multipleOf: 1,
      },
    },
  };

  uiSchema: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        label: 'Age',
        type: 'Control',
        scope: '#/properties/age',
      },
    ],
  };
}
