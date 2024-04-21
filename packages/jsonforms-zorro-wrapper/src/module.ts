import { CommonModule, DatePipe } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextControlRenderer } from './controls/text.renderer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { DateControlRenderer } from './controls/date.renderer';
import { DateRangeControlRenderer } from './controls/date-range.renderer';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { HorizontalLayoutRenderer } from './layouts/horizontal-layout.renderer';
import { NzValidationStatusPipe } from './other/validation-status.pipe';
import { BooleanControlRenderer } from './controls/boolean.renderer';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NumberControlRenderer } from './controls/number.renderer';
import { VerticalLayoutRenderer } from './layouts/vertical-layout.renderer';
import { GroupLayoutRenderer } from './layouts/group-layout.renderer';
import { CategorizationTabLayoutRenderer } from './layouts/categorization-layout.renderer';
import { ObjectControlRenderer } from './other/object.renderer';
import { ToggleControlRenderer } from './controls/toggle.renderer';
import { RangeControlRenderer } from './controls/range.renderer';
import { TextAreaRenderer } from './controls/textarea.renderer';
import { SelectControlRenderer } from './controls/select.renderer';
import { StepperLayoutRenderer } from './layouts/stepper-layout.renderer';
import { CardGroupLayoutRenderer } from './layouts/card-group-layout.renderer';
import { JsonFormsModule } from './jsonForms';
import { RadioControlRenderer } from './controls/radio.renderer';
import { RadioButtonControlRenderer } from './controls/radio-button.renderer';
import { CheckboxGroupControlRenderer } from './complex/checkbox-group.renderer';
import { MultiselectControlRenderer } from './complex/multiselect.renderer';
import { ArrayLayoutRenderer } from './layouts/array-layout.renderer';
import { WysiwygRenderer } from './controls/wysiwyg.renderer';
import { ImageControlRenderer } from './complex/image/image.renderer';
import { JFZImageRendererService } from './complex/image/image.renderer.service';
import { GooglePlacesRenderer } from './complex/google-places/google-places.renderer';
import { GooglePlacesApiLoaderService } from './complex/google-places/google-places-api-loader.service';
import { MentionControlRenderer } from './complex/mention/mention.renderer';
import { AvatarComponent } from './components/avatar.component';

const modules = [CommonModule, JsonFormsModule, ReactiveFormsModule, NzFormModule, NzInputModule, NzDatePickerModule, NzCheckboxModule];

const components = [AvatarComponent];

const complex = [GooglePlacesRenderer, ImageControlRenderer, MentionControlRenderer, CheckboxGroupControlRenderer, MultiselectControlRenderer];

const controls = [
  BooleanControlRenderer,
  DateControlRenderer,
  DateRangeControlRenderer,
  NumberControlRenderer,
  RadioControlRenderer,
  RadioButtonControlRenderer,
  RangeControlRenderer,
  SelectControlRenderer,
  TextControlRenderer,
  TextAreaRenderer,
  ToggleControlRenderer,
  WysiwygRenderer,
];

const layouts = [
  ArrayLayoutRenderer,
  CardGroupLayoutRenderer,
  CategorizationTabLayoutRenderer,
  GroupLayoutRenderer,
  HorizontalLayoutRenderer,
  StepperLayoutRenderer,
  VerticalLayoutRenderer,
  ObjectControlRenderer,
];

@NgModule({
  imports: [...modules, ...complex, ...components, ...controls, ...layouts, NzValidationStatusPipe],
  exports: [JsonFormsModule, ReactiveFormsModule, NzFormModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [DatePipe, JFZImageRendererService, GooglePlacesApiLoaderService],
})
export class JsonFormsZorroModule {}
