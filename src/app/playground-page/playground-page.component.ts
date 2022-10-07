import { Component } from '@angular/core';
import { JsonFormsRendererRegistryEntry, JsonSchema, UISchemaElement } from '@jsonforms/core';
import { ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';
import schema from '../demo-page/schema.json';
import uischema from '../demo-page/uischema.json';
import { array } from './schemas/array';
import { groupButton } from './schemas/group-button';
import { listDetails } from './schemas/list-details';
import { itemArray } from './schemas/item-array';
import { rule } from './schemas/rule';

@Component({
  selector: 'app-playground-page',
  templateUrl: './playground-page.component.html',
  styles: [
    `
      :host {
        padding: 24px;
      }

      nz-select {
        width: 100%;
        margin-bottom: 20px;
      }

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
  formData = null;

  readonly options = [
    { label: 'Vertical Layout', value: 'default' },
    { label: 'Simple group with submit', value: 'group-button' },
    { label: 'Array', value: 'array' },
    { label: 'Simple array with one property', value: 'item-array' },
    { label: 'List with details', value: 'listDetails' },
    { label: 'Rule', value: 'rule' },
  ];
  loading: boolean;

  log(type: string, $event: any) {
    console.log('======' + type + '======');
    console.log($event);
    console.log('============');
  }

  updateSchema($event: any) {
    this.schema = null;
    this.schema = JSON.parse($event);
  }

  updateUiSchema($event: any) {
    this.uischema = null;
    this.uischema = JSON.parse($event);
  }

  selectTemplate(template: string) {
    switch (template) {
      case 'group-button':
        this.schema = groupButton.schema;
        this.uischema = groupButton.uiSchema;
        break;
      case 'array':
        this.schema = array.schema;
        this.uischema = array.uiSchema;
        break;
      case 'item-array':
        this.schema = itemArray.schema;
        this.uischema = itemArray.uiSchema;
        break;
      case 'listDetails':
        this.schema = listDetails.schema;
        this.uischema = listDetails.uiSchema;
        break;
      case 'rule':
        this.schema = rule.schema;
        this.uischema = rule.uiSchema;
        break;
      default:
        this.schema = schema;
        this.uischema = uischema;
        break;
    }
    this.updateSchemaCode();
  }

  updateSchemaCode() {
    this.schemaCode = JSON.stringify(this.schema, null, 2);
    this.uischemaCode = JSON.stringify(this.uischema, null, 2);
  }

  submitted(submited: string, $event: any) {
    this.loading = true;
    setTimeout(() => (this.loading = false), 1000);
    this.log('submited', $event);
  }
}
