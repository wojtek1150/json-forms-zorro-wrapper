import { Component } from '@angular/core';
import { JsonSchema } from '@jsonforms/core';
import { JFZVerticalLayout, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';

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
          uploadUrl: 'http://localhost:4200/images',
          deleteUrl: 'http://localhost:4200/images',
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
