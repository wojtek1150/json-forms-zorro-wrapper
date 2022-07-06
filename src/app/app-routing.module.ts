import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaasSubmitFormComponent } from './saas-submit-form/saas-submit-form.component';
import { DemoPageComponent } from './demo-page/demo-page.component';

const routes: Routes = [
  {
    component: DemoPageComponent,
    path: '',
  },
  {
    component: SaasSubmitFormComponent,
    path: 'saas',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
