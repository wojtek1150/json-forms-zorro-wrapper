import { Routes } from '@angular/router';
import { DocsComponent } from './docs.component';

export const DOCS_ROUTES: Routes = [
  {
    component: DocsComponent,
    path: '',
    children: [
      {
        loadComponent: () => import('./schema-docs/schema-docs.component').then(c => c.SchemaDocsComponent),
        path: 'schema',
      },
      {
        loadComponent: () => import('./json-forms-docs/json-forms-docs.component').then(c => c.JsonFormsDocsComponent),
        path: 'forms',
      },
      {
        loadComponent: () => import('./texfield-docs/texfield-docs.component').then(c => c.TexfieldDocsComponent),
        path: 'textfield',
      },
      {
        loadComponent: () => import('./date-picker-docs/date-picker-docs.component').then(c => c.DatePickerDocsComponent),
        path: 'date',
      },
      {
        loadComponent: () => import('./date-range-picker-docs/date-range-picker-docs.component').then(c => c.DateRangePickerDocsComponent),
        path: 'date-range',
      },
      {
        loadComponent: () => import('./wysiwyg-docs/wysiwyg-docs.component').then(c => c.WysiwygDocsComponent),
        path: 'wysiwyg',
      },
      {
        loadComponent: () => import('./image-docs/image-docs.component').then(c => c.ImageDocsComponent),
        path: 'image',
      },
      {
        loadComponent: () => import('./number-docs/number-docs.component').then(c => c.NumberDocsComponent),
        path: 'number',
      },
      {
        loadComponent: () => import('./select-docs/select-docs.component').then(c => c.SelectDocsComponent),
        path: 'select',
      },
      {
        loadComponent: () => import('./mention-docs/mention-docs.component').then(c => c.MentionDocsComponent),
        path: 'mention',
      },
      {
        loadComponent: () => import('./multiselect-docs/multiselect-docs.component').then(c => c.MultiselectDocsComponent),
        path: 'multiselect',
      },
      {
        loadComponent: () => import('./toggle-docs/toggle-docs.component').then(c => c.ToggleDocsComponent),
        path: 'toggle',
      },
      {
        loadComponent: () => import('./radio-docs/radio-docs.component').then(c => c.RadioDocsComponent),
        path: 'radio',
      },
      {
        loadComponent: () => import('./google-places-docs/google-places-docs.component').then(c => c.GooglePlacesDocsComponent),
        path: 'google-places',
      },
      {
        path: '**',
        redirectTo: 'schema',
      },
    ],
  },
];
