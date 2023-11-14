import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';

@Component({
  selector: 'app-toggle-docs',
  templateUrl: './toggle-docs.component.html',
  standalone: true,
  imports: [JsonFormsZorroModule, NzTableModule],
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
