import { Component } from '@angular/core';
import { JsonSchema } from '@jsonforms/core';
import { JFZVerticalLayout, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';

@Component({
  selector: 'app-toggle-docs',
  templateUrl: './toggle-docs.component.html',
})
export class ToggleDocsComponent {
  renderers = ngZorroRenderers;
  data = { done: false };
  data2 = { done: false };

  schema: JsonSchema = {
    type: 'object',
    properties: {
      done: {
        type: 'boolean',
      },
    },
  };

  uiSchema: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        label: 'Completed',
        scope: '#/properties/done',
      },
    ],
  };

  schema2: JsonSchema = {
    type: 'object',
    properties: {
      done: {
        type: 'boolean',
      },
    },
  };

  uiSchema2: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        type: 'Control',
        label: 'Completed',
        scope: '#/properties/done',
        options: {
          toggle: true,
        },
      },
    ],
  };
}
