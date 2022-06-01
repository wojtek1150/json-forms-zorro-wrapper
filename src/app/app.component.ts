import { Component } from '@angular/core';
import { angularMaterialRenderers } from '@jsonforms/angular-material';
import { schema } from './json-forms-custom/schema';
import { uischema } from './json-forms-custom/uischema';
import { formData } from './json-forms-custom/formdata';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  angularMaterialRenderers = angularMaterialRenderers;

  readonly demo = {
    html: `
        <jsonforms
          [schema]="schema"
          [uischema]="uischema"
          [renderers]="angularMaterialRenderers"
          [(data)]="formData"
        ></jsonforms>
    `,
    htmlNote: `import { angularMaterialRenderers } from '@jsonforms/angular-material';`,
    schema: JSON.stringify(schema, null, 2),
    uischema: JSON.stringify(uischema, null, 2),
    formdata: JSON.stringify(formData, null, 2)
  };
}
