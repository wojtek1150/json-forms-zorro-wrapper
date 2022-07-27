import { Component } from '@angular/core';
import { JsonFormsRendererRegistryEntry, JsonSchema, UISchemaElement } from '@jsonforms/core';
import { ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';
import { formData } from './formdata';
import { schema } from './schema';
import { uiSchema } from './uischema';

@Component({
  selector: 'app-saas-submit-form',
  templateUrl: './saas-submit-form.component.html',
  styleUrls: ['./saas-submit-form.component.scss'],
})
export class SaasSubmitFormComponent {
  renderers: JsonFormsRendererRegistryEntry[] = ngZorroRenderers;

  schema: JsonSchema = schema;
  uischema: UISchemaElement = uiSchema;
  formData = formData;
  step = 1;

  log($event: any, type: string) {
    console.log('======');
    console.log(type);
    console.log($event);
    console.log('======');
  }

  onStepChanged($event: { step: number; data: any }) {
    this.step = $event.step;
    this.log($event, 'stepchanged');
  }
}
