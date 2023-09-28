import { Component } from '@angular/core';
import { JsonSchema, JFZVerticalLayout, ngZorroRenderers, JZW_GOOGLE_PLACES_API_KEY } from '@wojtek1150/jsonforms-zorro-wrapper';

@Component({
  selector: 'app-google-places-docs',
  templateUrl: './google-places-docs.component.html',
  styles: [
    `
      nz-alert {
        margin: 20px 0;
      }

      .flex {
        margin-top: 20px;
      }

      img {
        width: 100%;
        height: auto;
      }

      .flex pre {
        margin-bottom: 24px;
      }
    `,
  ],
})
export class GooglePlacesDocsComponent {
  renderers = ngZorroRenderers;

  schema: JsonSchema = {
    type: 'object',
    properties: {
      city: {
        title: 'Google Places Autocomplete',
        type: 'string',
      },
    },
  };

  configuration = `{\n  provide: JZW_GOOGLE_PLACES_API_KEY,\n  useValue: 'YOUR_API_KEY',\n};`;

  uiSchema: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        label: '',
        type: 'Control',
        scope: '#/properties/city',
        options: {
          format: 'google-places',
        },
      },
    ],
  };
  data = {
    city: 'Warsaw',
    cityPlaceId: 'ChIJAZ-GmmbMHkcR_NPqiCq-8HI',
  };
}
