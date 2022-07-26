import { Component } from '@angular/core';
import { JsonFormsRendererRegistryEntry, JsonSchema, UISchemaElement } from '@jsonforms/core';
import { ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';
import { schema } from '../demo-page/schema';
import { uischema } from '../demo-page/uischema';

@Component({
  selector: 'app-playground-page',
  templateUrl: './playground-page.component.html',
  styles: [
    `
      h2 {
        margin: 0;
      }
      .editor {
        display: block;
        width: 100%;
        height: 350px;
        border: 2px solid #ccc;
        margin: 1em 0;
      }
    `,
  ],
})
export class PlaygroundPageComponent {
  renderers: JsonFormsRendererRegistryEntry[] = ngZorroRenderers;

  schema: JsonSchema = schema;
  uischema: UISchemaElement = uischema;

  schemaCode = JSON.stringify(schema, null, 2);
  uischemaCode = JSON.stringify(uischema, null, 2);
  formData;

  log($event: any) {
    console.log('======');
    console.log($event);
    console.log('======');
  }

  updateSchema($event: any) {
    this.schema = null;
    this.schema = JSON.parse($event);
  }

  updateUiSchema($event: any) {
    this.uischema = null;
    this.uischema = JSON.parse($event);
  }
}
