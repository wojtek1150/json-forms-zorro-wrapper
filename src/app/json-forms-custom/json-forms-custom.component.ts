import { Component } from '@angular/core';
import { schema } from './schema';
import { uischema } from './uischema';
import { ngZorroRenderers } from '../zorro-wrapper';
import { formData } from './formdata';

@Component({
  selector: 'app-json-forms-custom',
  templateUrl: './json-forms-custom.component.html',
})
export class JsonFormsCustomComponent {
  schema = schema;
  uischema = uischema;
  formData = formData;
  renderers = ngZorroRenderers;

  log($event: any) {
    console.log('LOG', '======', $event, '======');
  }
}
