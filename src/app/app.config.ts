import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, withInMemoryScrolling } from '@angular/router';
import { JZW_GOOGLE_PLACES_API_KEY } from '@wojtek1150/jsonforms-zorro-wrapper';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { APP_ROUTES } from './app.routes';
import { ApplicationConfig } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: JZW_GOOGLE_PLACES_API_KEY,
      useValue: 'YOUR_API_KEY',
    },
    provideRouter(APP_ROUTES, withInMemoryScrolling({ anchorScrolling: 'enabled' })),
    importProvidersFrom(HttpClientModule, BrowserAnimationsModule),
  ],
};
