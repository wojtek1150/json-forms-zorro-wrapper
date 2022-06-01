import { Component } from '@angular/core';
import { schema } from './schema';
import { uischema } from './uischema';
import { ngZorroRenderers } from '../zorro-wrapper';

@Component({
  selector: 'app-json-forms-custom',
  templateUrl: './json-forms-custom.component.html',
})
export class JsonFormsCustomComponent {
  schema = schema;
  uischema = uischema;
  renderers = ngZorroRenderers;

  formData = {
    name: '',
    vegetarian: false,
    birthDate: '2022-06-01',
    personalData: {
      age: 34
    },
    postalCode: '12345',
    nationality: 'DE'
  };

  log($event: any) {
    console.log('LOG', '======', $event, '======');
  }
}
