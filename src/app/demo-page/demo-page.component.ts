import { Component } from '@angular/core';
import schema from './schema.json';
import uischema from './uischema.json';
import { formData } from './formdata';
import { JsonFormsRendererRegistryEntry, JsonSchema, UISchemaElement } from '@jsonforms/core';
import { Config, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';

@Component({
  selector: 'app-demo-page',
  templateUrl: './demo-page.component.html',
  styleUrls: ['./demo-page.component.scss'],
})
export class DemoPageComponent {
  schema: JsonSchema = schema;
  uischema: UISchemaElement = uischema;
  renderers: JsonFormsRendererRegistryEntry[] = ngZorroRenderers;
  formData = formData;
  readonly html = `
    <jsonforms
      [schema]="schema"
      [uischema]="uischema"
      [renderers]="ngZorroRenderers"
      [(data)]="formData"
    ></jsonforms>
    `;
  jsonformsConfig: Config = {
    multiselectExternalDictionary: {
      tags: ['foo', 'bar', 'tar'].map(label => ({ label, value: label })),
    },
  };

  log($event: any) {
    console.log('======');
    console.log($event);
    console.log('======');
  }
}
