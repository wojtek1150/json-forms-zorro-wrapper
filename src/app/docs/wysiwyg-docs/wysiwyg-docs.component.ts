import { Component } from '@angular/core';
import { JsonSchema } from '@jsonforms/core';
import { JFZVerticalLayout, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';

@Component({
  selector: 'app-wysiwyg-docs',
  templateUrl: './wysiwyg-docs.component.html',
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
export class WysiwygDocsComponent {
  renderers = ngZorroRenderers;
  data = {
    comment: '<p>Enter comment here</p>',
  };

  schema: JsonSchema = {
    type: 'object',
    properties: {
      comment: {
        type: 'string',
      },
    },
  };

  uiSchemaWysiwyg: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        label: 'Comment',
        type: 'Control',
        scope: '#/properties/comment',
        options: {
          wysiwyg: true,
        },
      },
    ],
  };
}