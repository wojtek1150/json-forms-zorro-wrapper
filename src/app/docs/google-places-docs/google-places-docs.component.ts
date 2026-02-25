import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { FormsModule } from '@angular/forms';
import { ControlDocsAbstract } from '../control-docs.abstract';
import { EditorFormatterPipe } from '../../pipes/editor-formatter.pipe';

@Component({
  selector: 'app-google-places-docs',
  templateUrl: './google-places-docs.component.html',
  imports: [JsonFormsZorroModule, NzTableModule, NzAlertModule, NzCodeEditorModule, FormsModule, EditorFormatterPipe],
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
export class GooglePlacesDocsComponent extends ControlDocsAbstract {
  schema = null;
  uiSchema = null;

  readonly configuration = `{\n  provide: JZW_GOOGLE_PLACES_API_KEY,\n  useValue: 'YOUR_API_KEY',\n};`;

  override dataObjects: Record<string, any> = {
    dataCity: {
      city: 'Warsaw',
      cityPlaceId: 'ChIJAZ-GmmbMHkcR_NPqiCq-8HI',
    },
    dataScoped: {
      city: 'LaFayette',
      cityPlaceId: 'ChIJ8dmELpgf2okRSzXgknw8fxc',
      cityState: 'NY',
      scoped: {
        country: 'us',
      },
    },
  };

  override schemaObjects: Record<string, JsonSchema> = {
    schemaCity: {
      type: 'object',
      properties: {
        city: {
          title: 'Google Places Autocomplete',
          type: 'string',
        },
      },
    },
    schemaScoped: {
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
    },
  };

  override uiSchemaObjects: Record<string, JFZVerticalLayout> = {
    uiSchemaCity: {
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
    },
    uiSchemaScoped: {
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
    },
  };
}
