import { Component } from '@angular/core';
import { JsonSchema } from '@jsonforms/core';
import { JFZVerticalLayout, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';

@Component({
  selector: 'app-texfield-docs',
  templateUrl: './texfield-docs.component.html',
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

  uiSchemaWysiwyg: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        label: 'First name',
        type: 'Control',
        scope: '#/properties/name',
        options: {
          wysiwyg: true,
        },
      },
    ],
  };
}
