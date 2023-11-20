import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-texfield-docs',
  templateUrl: './texfield-docs.component.html',
  standalone: true,
  imports: [JsonFormsZorroModule, NzTableModule, JsonPipe],
})
export class TexfieldDocsComponent {
  renderers = ngZorroRenderers;

  schema: JsonSchema = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        minLength: 3,
      },
    },
  };

  uiSchema: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        label: 'First name',
        type: 'Control',
        scope: '#/properties/name',
      },
    ],
  };

  uiSchemaArea: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        label: 'First name',
        type: 'Control',
        scope: '#/properties/name',
        options: {
          multi: true,
          minRows: 3,
          maxRows: 5,
        },
      },
    ],
  };
}
