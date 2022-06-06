import { Component } from '@angular/core';
import { schema } from './schema';
import { uischema } from './uischema';
import { formData } from './formdata';
import { JsonFormsRendererRegistryEntry, JsonSchema, UISchemaElement } from '@jsonforms/core';
import { ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';

@Component({
  selector: 'app-json-forms-custom',
  templateUrl: './json-forms-custom.component.html',
})
export class JsonFormsCustomComponent {
  schema: JsonSchema = schema;
  uischema: UISchemaElement = uischema;
  renderers: JsonFormsRendererRegistryEntry[] = ngZorroRenderers;
  formData = formData;

  log($event: any) {
    console.log('======');
    console.log($event);
    console.log('======');
  }
}
