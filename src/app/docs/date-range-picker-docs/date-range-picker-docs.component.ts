import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-date-range-picker-docs',
  templateUrl: './date-range-picker-docs.component.html',
  standalone: true,
  imports: [JsonFormsZorroModule, NzTableModule],
})
export class DateRangePickerDocsComponent {
  renderers = ngZorroRenderers;
  data = {};

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
        },
      },
    ],
  };
}
