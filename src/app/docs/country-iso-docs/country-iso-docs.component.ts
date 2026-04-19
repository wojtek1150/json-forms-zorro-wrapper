import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { FormsModule } from '@angular/forms';
import { ControlDocsAbstract } from '../control-docs.abstract';
import { EditorFormatterPipe } from '../../pipes/editor-formatter.pipe';

@Component({
  selector: 'app-country-iso-docs',
  templateUrl: './country-iso-docs.component.html',
  imports: [JsonFormsZorroModule, NzTableModule, NzAlertModule, NzCodeEditorModule, FormsModule, EditorFormatterPipe],
})
export class CountryIsoDocsComponent extends ControlDocsAbstract {
  override dataObjects: Record<string, any> = {
    dataCountry: {},
  };

  override schemaObjects: Record<string, JsonSchema> = {
    schemaCountry: {
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
    },
  };

  override uiSchemaObjects: Record<string, JFZVerticalLayout> = {
    uiSchemaCountry: {
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
    },
  };
}
