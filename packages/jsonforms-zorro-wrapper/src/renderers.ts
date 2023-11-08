import { RankedTester } from './core';

import { BooleanControlRenderer, BooleanControlTester } from './controls/boolean.renderer';
import { DateControlRenderer, DateControlRendererTester } from './controls/date.renderer';
import { NumberControlRenderer, NumberControlRendererTester } from './controls/number.renderer';
import { TextControlRenderer, TextControlRendererTester } from './controls/text.renderer';

import { HorizontalLayoutRenderer, HorizontalLayoutTester } from './layouts/horizontal-layout.renderer';
import { VerticalLayoutRenderer, VerticalLayoutTester } from './layouts/vertical-layout.renderer';
import { GroupLayoutRenderer, GroupLayoutTester } from './layouts/group-layout.renderer';
import { CategorizationTabLayoutRenderer, CategorizationTester } from './layouts/categorization-layout.renderer';
import { ObjectControlRenderer, ObjectControlRendererTester } from './other/object.renderer';
import { ToggleControlRenderer, ToggleControlRendererTester } from './controls/toggle.renderer';
import { RangeControlRenderer, RangeControlRendererTester } from './controls/range.renderer';
import { TextAreaRenderer, TextAreaRendererTester } from './controls/textarea.renderer';
import { SelectControlRenderer, SelectControlTester } from './controls/select.renderer';
import { StepperLayoutRenderer, StepperTester } from './layouts/stepper-layout.renderer';
import { CardGroupLayoutRenderer, CardGroupLayoutTester } from './layouts/card-group-layout.renderer';
import { RadioControlRenderer, RadioControlRendererTester } from './controls/radio.renderer';
import { RadioButtonControlRenderer, RadioButtonControlRendererTester } from './controls/radio-button.renderer';
import { CheckboxGroupControlRenderer, CheckboxGroupControlRendererTester } from './complex/checkbox-group.renderer';
import { MultiselectControlRenderer, MultiselectControlRendererTester } from './complex/multiselect.renderer';
import { ArrayLayoutRenderer, ArrayLayoutRendererTester } from './layouts/array-layout.renderer';
import { WysiwygRenderer, WysiwygRendererTester } from './controls/wysiwyg.renderer';
import { ImageControlRenderer, ImageControlRendererTester } from './complex/image/image.renderer';
import { GooglePlacesControlRendererTester, GooglePlacesRenderer } from './complex/google-places/google-places.renderer';
import { MentionControlRenderer, MentionControlRendererTester } from './complex/mention/mention.renderer';

export const ngZorroRenderers: {
  tester: RankedTester;
  renderer: any;
}[] = [
  // controls
  { tester: SelectControlTester, renderer: SelectControlRenderer },
  { tester: BooleanControlTester, renderer: BooleanControlRenderer },
  { tester: DateControlRendererTester, renderer: DateControlRenderer },
  { tester: NumberControlRendererTester, renderer: NumberControlRenderer },
  { tester: RangeControlRendererTester, renderer: RangeControlRenderer },
  { tester: RadioControlRendererTester, renderer: RadioControlRenderer },
  { tester: RadioButtonControlRendererTester, renderer: RadioButtonControlRenderer },
  { tester: TextControlRendererTester, renderer: TextControlRenderer },
  { tester: TextAreaRendererTester, renderer: TextAreaRenderer },
  { tester: ToggleControlRendererTester, renderer: ToggleControlRenderer },
  { tester: WysiwygRendererTester, renderer: WysiwygRenderer },
  // complex controls
  { tester: CheckboxGroupControlRendererTester, renderer: CheckboxGroupControlRenderer },
  { tester: MultiselectControlRendererTester, renderer: MultiselectControlRenderer },
  { tester: MentionControlRendererTester, renderer: MentionControlRenderer },
  { tester: ImageControlRendererTester, renderer: ImageControlRenderer },
  { tester: GooglePlacesControlRendererTester, renderer: GooglePlacesRenderer },
  // layouts
  { tester: CategorizationTester, renderer: CategorizationTabLayoutRenderer },
  { tester: StepperTester, renderer: StepperLayoutRenderer },
  { tester: CardGroupLayoutTester, renderer: CardGroupLayoutRenderer },
  { tester: GroupLayoutTester, renderer: GroupLayoutRenderer },
  { tester: HorizontalLayoutTester, renderer: HorizontalLayoutRenderer },
  { tester: VerticalLayoutTester, renderer: VerticalLayoutRenderer },
  { tester: ArrayLayoutRendererTester, renderer: ArrayLayoutRenderer },
  // other
  { tester: ObjectControlRendererTester, renderer: ObjectControlRenderer },
];
