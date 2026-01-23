import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-google-places-docs',
  templateUrl: './google-places-docs.component.html',
  imports: [JsonFormsZorroModule, NzTableModule, NzAlertModule, JsonPipe],
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
  readonly configuration = `{\n  provide: JZW_GOOGLE_PLACES_API_KEY,\n  useValue: 'YOUR_API_KEY',\n};`;

  schema: JsonSchema = {
    type: 'object',
    properties: {
      city: {
        title: 'Google Places Autocomplete',
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
        scope: '#/properties/city',
        options: {
          format: 'google-places',
        },
      },
    ],
  };

  schema1: JsonSchema = {
    type: 'object',
    properties: {
      scoped: {
        type: 'object',
        properties: {
          country: {
            title: 'Country',
            type: 'string',
          },
        },
      },
      city: {
        title: 'Google Places Autocomplete',
        type: 'string',
      },
    },
  };

  uiSchema1: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        label: 'Country',
        type: 'Control',
        scope: '#/properties/scoped/properties/country',
      },
      {
        label: 'City',
        type: 'Control',
        scope: '#/properties/city',
        options: {
          format: 'google-places',
          countryRestrictionField: '#/properties/scoped/properties/country',
          withState: true,
        },
      },
    ],
  };

  data = {
    city: 'Warsaw',
    cityPlaceId: 'ChIJAZ-GmmbMHkcR_NPqiCq-8HI',
  };

  data1 = {
    city: 'LaFayette',
    cityPlaceId: 'ChIJ8dmELpgf2okRSzXgknw8fxc',
    cityState: 'NY',
    scoped: {
      country: 'us',
    },
  };
}
