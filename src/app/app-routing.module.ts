import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaasSubmitFormComponent } from './saas-submit-form/saas-submit-form.component';
import { DemoPageComponent } from './demo-page/demo-page.component';
import { RenderersPageComponent } from './renderers-page/renderers-page.component';
import { PlaygroundPageComponent } from './playground-page/playground-page.component';

const routes: Routes = [
  {
    component: DemoPageComponent,
    path: '',
  },
  {
    component: RenderersPageComponent,
    path: 'renderers',
  },
  {
    component: SaasSubmitFormComponent,
    path: 'saas',
  },
  {
    component: PlaygroundPageComponent,
    path: 'playground',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
