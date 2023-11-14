import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-date-picker-docs',
  templateUrl: './date-picker-docs.component.html',
  standalone: true,
  imports: [JsonFormsZorroModule, NzTableModule],
})
export class DatePickerDocsComponent {
  renderers = ngZorroRenderers;
  data = {};
  data2 = {};

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
          showTime: true,
        },
      },
    ],
  };

  schema2: JsonSchema = {
    type: 'object',
    properties: {
      dateRange: {
        type: 'array',
      },
    },
  };

  uiSchema2: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        scope: '#/properties/dateRange',
        label: 'DatePicker',
        options: {
          format: 'dateRange',
        },
      },
    ],
  };
}
