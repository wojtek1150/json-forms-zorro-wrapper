import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TexfieldDocsComponent } from './texfield-docs/texfield-docs.component';
import { DocsComponent } from './docs.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { SchemaDocsComponent } from './schema-docs/schema-docs.component';
import { NzTableModule } from 'ng-zorro-antd/table';

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
        component: TexfieldDocsComponent,
        path: 'textfield',
      },
      {
        path: '**',
        redirectTo: 'schema',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), NzLayoutModule, NzMenuModule, NzIconModule, NzTableModule],
  declarations: [TexfieldDocsComponent, DocsComponent, SchemaDocsComponent],
})
export class DocsModule {}
