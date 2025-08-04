import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-country-iso-docs',
  templateUrl: './country-iso-docs.component.html',
  imports: [JsonFormsZorroModule, NzTableModule, NzAlertModule, JsonPipe],
})
export class CountryIsoDocsComponent {
  renderers = ngZorroRenderers;
  data = {};
  dataOne = {};

  schema: JsonSchema = {
    type: 'object',
    properties: {
      country: {
        type: 'string',
        title: 'Select Country',
      },
      countryIso: {
        type: 'string',
        title: 'Country ISO Code (hidden)',
      },
    },
    required: ['country'],
  };

  uiSchema: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        label: 'Country',
        type: 'Control',
        scope: '#/properties/country',
        options: {
          format: 'country-iso',
          isoKey: 'iso',
          countriesList: [
            { country: 'Poland', iso: 'PL' },
            { country: 'Spain', iso: 'ES' },
            { country: 'Italy', iso: 'IT' },
            { country: 'United Kingdom', iso: 'GB' },
            { country: 'United States', iso: 'US' },
            { country: 'Canada', iso: 'CA' },
          ],
        },
      },
    ],
  };
}
