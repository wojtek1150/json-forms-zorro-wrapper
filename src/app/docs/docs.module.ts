import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TexfieldDocsComponent } from './texfield-docs/texfield-docs.component';
import { DocsComponent } from './docs.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SchemaDocsComponent } from './schema-docs/schema-docs.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { JFZImageRendererService, JsonFormsZorroModule } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { JsonFormsDocsComponent } from './json-forms-docs/json-forms-docs.component';
import { ImageDocsComponent } from './image-docs/image-docs.component';
import { WysiwygDocsComponent } from './wysiwyg-docs/wysiwyg-docs.component';
import { NumberDocsComponent } from './number-docs/number-docs.component';
import { SelectDocsComponent } from './select-docs/select-docs.component';
import { MultiselectDocsComponent } from './multiselect-docs/multiselect-docs.component';
import { ToggleDocsComponent } from './toggle-docs/toggle-docs.component';
import { RadioDocsComponent } from './radio-docs/radio-docs.component';
import { ImageRendererService } from './image.service';
import { GooglePlacesDocsComponent } from './google-places-docs/google-places-docs.component';
import { MentionDocsComponent } from './mention-docs/mention-docs.component';

const routes: Routes = [
  {
    component: DocsComponent,
    path: '',
    children: [
      {
        component: SchemaDocsComponent,
        path: 'schema',
      },
      {
        component: JsonFormsDocsComponent,
        path: 'forms',
      },
      {
        component: TexfieldDocsComponent,
        path: 'textfield',
      },
      {
        component: WysiwygDocsComponent,
        path: 'wysiwyg',
      },
      {
        component: ImageDocsComponent,
        path: 'image',
      },
      {
        component: NumberDocsComponent,
        path: 'number',
      },
      {
        component: SelectDocsComponent,
        path: 'select',
      },
      {
        component: MentionDocsComponent,
        path: 'mention',
      },
      {
        component: MultiselectDocsComponent,
        path: 'multiselect',
      },
      {
        component: ToggleDocsComponent,
        path: 'toggle',
      },
      {
        component: RadioDocsComponent,
        path: 'radio',
      },
      {
        component: GooglePlacesDocsComponent,
        path: 'google-places',
      },
      {
        path: '**',
        redirectTo: 'schema',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), NzLayoutModule, NzMenuModule, NzIconModule, NzTableModule, JsonFormsZorroModule, NzAlertModule],
  declarations: [
    TexfieldDocsComponent,
    DocsComponent,
    SchemaDocsComponent,
    JsonFormsDocsComponent,
    ImageDocsComponent,
    WysiwygDocsComponent,
    NumberDocsComponent,
    SelectDocsComponent,
    MultiselectDocsComponent,
    ToggleDocsComponent,
    RadioDocsComponent,
    GooglePlacesDocsComponent,
    MentionDocsComponent,
  ],
  providers: [{ provide: JFZImageRendererService, useClass: ImageRendererService }],
})
export class DocsModule {}
