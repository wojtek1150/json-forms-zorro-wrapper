import { Component } from '@angular/core';
import { JsonSchema, JFZVerticalLayout, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';

@Component({
  selector: 'app-image-docs',
  templateUrl: './image-docs.component.html',
  styles: [
    `
      .flex {
        margin-top: 20px;
      }

      .flex pre {
        margin-bottom: 24px;
      }
    `,
  ],
})
export class ImageDocsComponent {
  renderers = ngZorroRenderers;

  schema: JsonSchema = {
    type: 'object',
    properties: {
      image: {
        type: 'string',
        errorMessage: 'testing',
      },
    },
  };

  uiSchema: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        label: '',
        type: 'Control',
        scope: '#/properties/image',
        options: {
          format: 'image',
          hint: 'You can upload JPG, PNG or GIF file',
          uploadUrl: 'https://mocky.io/v3/0d4e05cd-4ce6-4061-a736-9d48a4869a9e',
          deleteUrl: 'https://mocky.io/v3/0d4e05cd-4ce6-4061-a736-9d48a4869a9e',
          maxImageWidth: 600,
          maxImageHeight: 600,
          maxImageSizeMB: 1,
        },
      },
    ],
  };
  data = {
    image: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  };
}
