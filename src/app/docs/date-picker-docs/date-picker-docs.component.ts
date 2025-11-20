import { Component } from '@angular/core';
import { DateControlUISchemaOptions, JFZVerticalLayout, JsonFormsZorroModule, JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';
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
          showTime: true,
          disablePastDates: true,
          maxDate: this.getMaxDate().toISOString(),
        } as DateControlUISchemaOptions,
      },
    ],
  };

  dataGroup = {};
  schemaGroup: JsonSchema = {
    type: 'object',
    properties: {
      endDate: {
        type: 'string',
        format: 'date-time',
      },
      date: {
        type: 'string',
        format: 'date-time',
        formatMaximum: { $data: '1/endDate' },
        errorMessage: {
          formatMaximum: 'should be before the end date',
        },
      },
    },
  };

  uiSchemaGroup: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/endDate',
        label: 'End date',
        options: {
          format: 'date',
          dateFormat: 'yyyy-MM-dd HH:mm',
          saveFormat: "yyyy-MM-dd'T'HH:mm:ss",
          showTime: false,
          disablePastDates: true,
        },
      },
      {
        type: 'Control',
        scope: '#/properties/date',
        label: 'This date must be before the end date',
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

  private getMaxDate(): Date {
    const date = new Date();
    date.setDate(date.getDate() + 21); // +3 weeks
    date.setHours(14, 30, 0, 0); // set time to 14:30
    return date;
  }
}
