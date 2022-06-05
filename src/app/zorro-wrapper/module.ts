import { CommonModule, DatePipe } from '@angular/common';
import { JsonFormsModule } from '@jsonforms/angular';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextControlRenderer } from './controls/text.renderer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { DateControlRenderer } from './controls/date.renderer';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { HorizontalLayoutRenderer } from './layouts/horizontal-layout.renderer';
import { NzValidationStatusPipe } from './other/validation-status.pipe';
import { BooleanControlRenderer } from './controls/boolean.renderer';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NumberControlRenderer } from './controls/number.renderer';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { VerticalLayoutRenderer } from './layouts/vertical-layout.renderer';
import { GroupLayoutRenderer } from './layouts/group-layout.renderer';
import { NzCardModule } from 'ng-zorro-antd/card';
import { CategorizationTabLayoutRenderer } from './layouts/categorization-layout.renderer';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ObjectControlRenderer } from './other/object.renderer';

const modules = [
  CommonModule,
  JsonFormsModule,
  ReactiveFormsModule,
  NzFormModule,
  NzInputModule,
  NzDatePickerModule,
  NzCheckboxModule,
];

const controls = [
  BooleanControlRenderer,
  TextControlRenderer,
  DateControlRenderer,
  NumberControlRenderer,
  CategorizationTabLayoutRenderer,
  GroupLayoutRenderer,
  HorizontalLayoutRenderer,
  VerticalLayoutRenderer,
  ObjectControlRenderer,
];

@NgModule({
  imports: [...modules, NzInputNumberModule, NzCardModule, NzTabsModule],
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
