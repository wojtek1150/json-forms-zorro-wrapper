import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { FormsModule } from '@angular/forms';
import { EditorFormatterPipe } from '../../pipes/editor-formatter.pipe';
import { ControlDocsAbstract } from '../control-docs.abstract';

@Component({
  selector: 'app-date-picker-docs',
  templateUrl: './date-picker-docs.component.html',
  imports: [JsonFormsZorroModule, NzTableModule, NzCodeEditorModule, FormsModule, EditorFormatterPipe],
})
export class DatePickerDocsComponent extends ControlDocsAbstract {
  schema: JsonSchema = {
    type: 'object',
    properties: {
      date: {
        type: 'string',
      },
    },
  };

  uiSchema: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/date',
        label: 'DatePicker',
        options: {
          format: 'date',
          dateFormat: 'yyyy-MM-dd HH:mm',
          saveFormat: "yyyy-MM-dd'T'HH:mm:ss",
          showTime: false,
          disablePastDates: true,
        },
      },
    ],
  };
}
