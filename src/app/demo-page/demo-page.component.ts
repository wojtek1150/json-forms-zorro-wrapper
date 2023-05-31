import { Component } from '@angular/core';
import schema from './schema.json';
import uischema from './uischema.json';
import { formData, jsonformsConfig } from './formdata';
import { ngZorroRenderers, JsonFormsRendererRegistryEntry, JsonSchema, UISchemaElement } from '@wojtek1150/jsonforms-zorro-wrapper';

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
  jsonformsConfig = jsonformsConfig;
  readonly html = `
    <jsonforms
      [schema]="schema"
      [uischema]="uischema"
      [renderers]="ngZorroRenderers"
      [config]="yourCustomConfig"
      [(data)]="formData"
    ></jsonforms>
    `;

  log($event: any) {
    console.log('======');
    console.log($event);
    console.log('======');
  }
}
