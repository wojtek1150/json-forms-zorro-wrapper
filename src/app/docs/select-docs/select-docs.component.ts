import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-select-docs',
  templateUrl: './select-docs.component.html',
  imports: [JsonFormsZorroModule, NzTableModule, JsonPipe],
})
export class SelectDocsComponent {
  renderers = ngZorroRenderers;
  data = {};
  dataOne = {};

  schema: JsonSchema = {
    type: 'object',
    properties: {
      enum: {
        type: 'string',
        enum: ['Never', 'Daily', 'Weekly', 'Monthly'],
      },
    },
  };

  uiSchema: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        label: 'Recurrence as Enum',
        type: 'Control',
        scope: '#/properties/enum',
      },
    ],
  };

  schemaOne: JsonSchema = {
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
  };

  uiSchemaOne: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        label: 'Recurrence as One of',
        type: 'Control',
        scope: '#/properties/oneOf',
      },
    ],
  };
}
