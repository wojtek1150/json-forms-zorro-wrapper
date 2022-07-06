import { Component } from '@angular/core';
import { schema } from '../json-forms-custom/schema';
import { uischema } from '../json-forms-custom/uischema';
import { formData } from '../json-forms-custom/formdata';

@Component({
  selector: 'app-demo-page',
  templateUrl: './demo-page.component.html',
  styleUrls: ['./demo-page.component.scss']
})
export class DemoPageComponent {

  readonly demo = {
    html: `
    <jsonforms
      [schema]="schema"
      [uischema]="uischema"
      [renderers]="ngZorroRenderers"
      [(data)]="formData"
    ></jsonforms>
    `,
    htmlNote: ``,
    schema: JSON.stringify(schema, null, 2),
    uischema: JSON.stringify(uischema, null, 2),
    formdata: JSON.stringify(formData, null, 2)
  };

}
