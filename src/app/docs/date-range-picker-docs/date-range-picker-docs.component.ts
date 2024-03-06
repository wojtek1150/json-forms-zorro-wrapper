import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ControlDocsAbstract } from '../control-docs.abstract';
import { EditorFormatterPipe } from '../../pipes/editor-formatter.pipe';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-date-range-picker-docs',
  templateUrl: './date-range-picker-docs.component.html',
  standalone: true,
  imports: [JsonFormsZorroModule, NzTableModule, EditorFormatterPipe, NzCodeEditorModule, FormsModule],
})
export class DateRangePickerDocsComponent extends ControlDocsAbstract {
  schema: JsonSchema = {
    type: 'object',
    properties: {
      dateRange: {
        type: 'array',
      },
    },
  };

  uiSchema: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/dateRange',
        label: 'DatePicker',
        options: {
          format: 'dateRange',
          dateFormat: 'yyyy-MM-dd HH:mm',
          saveFormat: "yyyy-MM-dd'T'HH:mm:ss",
          disablePastDates: true,
        },
      },
    ],
  };
}
