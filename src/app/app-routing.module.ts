import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoPageComponent } from './demo-page/demo-page.component';
import { PlaygroundPageComponent } from './playground-page/playground-page.component';
import { BuilderPageComponent } from './builder-page/builder-page.component';

const routes: Routes = [
  {
    component: DemoPageComponent,
    path: '',
  },
  {
    component: PlaygroundPageComponent,
    path: 'playground',
  },
  {
    component: BuilderPageComponent,
    path: 'builder',
  },
  {
    loadChildren: () => import('./docs/docs.module').then(m => m.DocsModule),
    path: 'docs',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
