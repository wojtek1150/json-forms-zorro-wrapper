import { Component } from '@angular/core';
import { JsonSchema } from '@jsonforms/core';
import { JFZVerticalLayout, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';

@Component({
  selector: 'app-image-docs',
  templateUrl: './image-docs.component.html',
})
export class ImageDocsComponent {
  renderers = ngZorroRenderers;

  schema: JsonSchema = {
    type: 'object',
    properties: {
      image: {
        type: 'string',
        minLength: 3,
      },
    },
  };

  uiSchema: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        label: 'Upload image lavel',
        type: 'Control',
        scope: '#/properties/image',
        options: {
          format: 'image',
        },
      },
    ],
  };
  data = {};
}
