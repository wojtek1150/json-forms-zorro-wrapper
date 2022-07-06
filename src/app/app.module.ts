import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IconDefinition } from '@ant-design/icons-angular';
import { CheckCircleFill } from '@ant-design/icons-angular/icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { JsonFormsModule } from '@jsonforms/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JsonFormsCustomComponent } from './json-forms-custom/json-forms-custom.component';
import { FormsModule } from '@angular/forms';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzTableModule } from 'ng-zorro-antd/table';
import { JsonFormsZorroModule } from '@wojtek1150/jsonforms-zorro-wrapper';
import { SaasSubmitFormComponent } from './saas-submit-form/saas-submit-form.component';
import { DemoPageComponent } from './demo-page/demo-page.component';

const icons: IconDefinition[] = [CheckCircleFill];

@NgModule({
  declarations: [
    AppComponent,
    JsonFormsCustomComponent,
    SaasSubmitFormComponent,
    DemoPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    JsonFormsModule,
    NzTabsModule,
    BrowserAnimationsModule,
    JsonFormsZorroModule,
    FormsModule,
    NzIconModule.forRoot(icons),
    NzAlertModule,
    NzTableModule,
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
