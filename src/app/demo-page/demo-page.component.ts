import { Component } from '@angular/core';
import schema from './schema.json';
import uischema from './uischema.json';
import { formData, jsonformsConfig } from './formdata';
import {
  JsonFormsRendererRegistryEntry,
  JsonFormsZorroModule,
  JsonSchema,
  ngZorroRenderers,
  UISchemaElement,
} from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzTabComponent, NzTabsComponent } from 'ng-zorro-antd/tabs';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-demo-page',
  templateUrl: './demo-page.component.html',
  styleUrls: ['./demo-page.component.scss'],
  imports: [NzAlertModule, NzTabsComponent, JsonFormsZorroModule, NzIconModule, JsonPipe, NzTabComponent],
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
    console.log('dataChange', $event);
    console.log('======');
  }

  onSubmit($event: any) {
    console.log('======');
    console.log('submitted', $event);
    console.log('======');
  }

  onCancel() {
    console.log('======');
    console.log('canceled');
    console.log('======');
  }
}
