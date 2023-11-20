import { Routes } from '@angular/router';
import { DemoPageComponent } from './demo-page/demo-page.component';
import { JFZImageRendererService } from '@wojtek1150/jsonforms-zorro-wrapper';
import { ImageRendererService } from './docs/image.service';

export const APP_ROUTES: Routes = [
  {
    component: DemoPageComponent,
    path: 'demo',
  },
  {
    loadComponent: () => import('./playground-page/playground-page.component').then(c => c.PlaygroundPageComponent),
    path: 'playground',
  },
  {
    loadComponent: () => import('./builder-page/builder-page.component').then(c => c.BuilderPageComponent),
    path: 'builder',
  },
  {
    loadChildren: () => import('./docs/docs.routes').then(r => r.DOCS_ROUTES),
    providers: [{ provide: JFZImageRendererService, useClass: ImageRendererService }],
    path: 'docs',
  },
  {
    path: '**',
    redirectTo: 'docs',
  },
];
