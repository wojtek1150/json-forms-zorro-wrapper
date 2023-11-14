import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-number-docs',
  templateUrl: './number-docs.component.html',
  standalone: true,
  imports: [JsonFormsZorroModule, NzTableModule],
})
export class NumberDocsComponent {
  renderers = ngZorroRenderers;

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
