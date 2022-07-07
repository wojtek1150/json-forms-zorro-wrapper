import { Component } from '@angular/core';
import { JsonFormsRendererRegistryEntry, JsonSchema, UISchemaElement } from '@jsonforms/core';
import { ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';
import { formData } from './formdata';
import { schema } from './schema';
import { uiSchema } from './uischema';
import { JsonFormsAngularService } from '../../../packages/jsonforms-zorro-wrapper/src/jsonForms';

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

  constructor(private formService: JsonFormsAngularService) {}

  log($event: any) {
    console.log('======');
    console.log($event);
    console.log('======');
  }

  do() {
    console.log(this.formService.getState());
  }
}
