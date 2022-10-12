import { Component } from '@angular/core';
import { JsonSchema } from '@jsonforms/core';
import { JFZVerticalLayout, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';

@Component({
  selector: 'app-number-docs',
  templateUrl: './number-docs.component.html',
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
