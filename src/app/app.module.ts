import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IconDefinition } from '@ant-design/icons-angular';
import { CheckCircleFill } from '@ant-design/icons-angular/icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzTableModule } from 'ng-zorro-antd/table';
import { JsonFormsZorroModule } from '@wojtek1150/jsonforms-zorro-wrapper';
import { SaasSubmitFormComponent } from './saas-submit-form/saas-submit-form.component';
import { DemoPageComponent } from './demo-page/demo-page.component';
import { HttpClientModule } from '@angular/common/http';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { RenderersPageComponent } from './renderers-page/renderers-page.component';
import { PlaygroundPageComponent } from './playground-page/playground-page.component';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NzSelectModule } from 'ng-zorro-antd/select';

const icons: IconDefinition[] = [CheckCircleFill];

@NgModule({
  declarations: [AppComponent, SaasSubmitFormComponent, DemoPageComponent, RenderersPageComponent, PlaygroundPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzTabsModule,
    BrowserAnimationsModule,
    JsonFormsZorroModule,
    FormsModule,
    HttpClientModule,
    NzIconModule.forRoot(icons),
    NzAlertModule,
    NzTableModule,
    NzDividerModule,
    NzLayoutModule,
    NzMenuModule,
    NzCodeEditorModule,
    NzSelectModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
