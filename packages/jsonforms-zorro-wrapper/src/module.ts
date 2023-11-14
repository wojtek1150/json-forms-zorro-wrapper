import { CommonModule, DatePipe } from '@angular/common';
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
import { ToggleControlRenderer } from './controls/toggle.renderer';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { RangeControlRenderer } from './controls/range.renderer';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { TextAreaRenderer } from './controls/textarea.renderer';
import { SelectControlRenderer } from './controls/select.renderer';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { StepperLayoutRenderer } from './layouts/stepper-layout.renderer';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { CardGroupLayoutRenderer } from './layouts/card-group-layout.renderer';
import { JsonFormsModule } from './jsonForms';
import { RadioControlRenderer } from './controls/radio.renderer';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { RadioButtonControlRenderer } from './controls/radio-button.renderer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CheckboxGroupControlRenderer } from './complex/checkbox-group.renderer';
import { MultiselectControlRenderer } from './complex/multiselect.renderer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ArrayLayoutRenderer } from './layouts/array-layout.renderer';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { WysiwygRenderer } from './controls/wysiwyg.renderer';
import { QuillModule } from 'ngx-quill';
import { ImageControlRenderer } from './complex/image/image.renderer';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { JFZImageRendererService } from './complex/image/image.renderer.service';
import { GooglePlacesRenderer } from './complex/google-places/google-places.renderer';
import { GooglePlacesApiLoaderService } from './complex/google-places/google-places-api-loader.service';
import { MentionControlRenderer } from './complex/mention/mention.renderer';
import { AvatarComponent } from './components/avatar.component';

const modules = [CommonModule, JsonFormsModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzDatePickerModule, NzCheckboxModule];

const controls = [
  SelectControlRenderer,
  BooleanControlRenderer,
  TextControlRenderer,
  DateControlRenderer,
  NumberControlRenderer,
  RangeControlRenderer,
  ToggleControlRenderer,
  TextAreaRenderer,
  CategorizationTabLayoutRenderer,
  GroupLayoutRenderer,
  HorizontalLayoutRenderer,
  VerticalLayoutRenderer,
  ObjectControlRenderer,
  StepperLayoutRenderer,
  CardGroupLayoutRenderer,
  RadioControlRenderer,
  RadioButtonControlRenderer,
  CheckboxGroupControlRenderer,
  MultiselectControlRenderer,
  MentionControlRenderer,
  ArrayLayoutRenderer,
  WysiwygRenderer,
  ImageControlRenderer,
  GooglePlacesRenderer,
];

@NgModule({
  imports: [
    ...modules,
    NzInputNumberModule,
    NzCardModule,
    NzTabsModule,
    NzSwitchModule,
    NzSliderModule,
    NzSelectModule,
    NzStepsModule,
    NzRadioModule,
    NzIconModule,
    NzButtonModule,
    NzBadgeModule,
    QuillModule,
    NzUploadModule,
    AvatarComponent,
  ],
  declarations: [...controls, NzValidationStatusPipe],
  exports: [...modules],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe, JFZImageRendererService, GooglePlacesApiLoaderService],
})
export class JsonFormsZorroModule {}
