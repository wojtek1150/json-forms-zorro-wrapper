import { CommonModule, DatePipe } from '@angular/common';
import { JsonFormsModule } from '@jsonforms/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextControlRenderer } from './controls/text.render';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { DateControlRenderer } from './controls/date';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { HorizontalLayoutRenderer } from './layouts/horizontal-layout';
import { NzValidationStatusPipe } from './other/validation-status.pipe';

const modules = [
  CommonModule,
  JsonFormsModule,
  ReactiveFormsModule,
  NzFormModule,
  NzInputModule,
  NzDatePickerModule,
];

const controls = [
  TextControlRenderer,
  DateControlRenderer,
  HorizontalLayoutRenderer
];

@NgModule({
  imports: [...modules],
  declarations: [
    ...controls,
    NzValidationStatusPipe
  ],
  entryComponents: [...controls],
  exports: [...modules],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe]
})
export class JsonFormsZorroModule {}
