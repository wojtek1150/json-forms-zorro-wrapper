import { RankedTester } from '@jsonforms/core';

import { BooleanControlRenderer, BooleanControlTester } from './controls/boolean.renderer';
import { DateControlRenderer, DateControlRendererTester } from './controls/date.renderer';
import { NumberControlRenderer, NumberControlRendererTester } from './controls/number.renderer';
import { TextControlRenderer, TextControlRendererTester } from './controls/text.renderer';

import { HorizontalLayoutRenderer, HorizontalLayoutTester } from './layouts/horizontal-layout.renderer';
import { VerticalLayoutRenderer, VerticalLayoutTester } from './layouts/vertical-layout.renderer';
import { GroupLayoutRenderer, GroupLayoutTester } from './layouts/group-layout.renderer';
import { CategorizationTabLayoutRenderer, CategorizationTester } from './layouts/categorization-layout.renderer';
import { ObjectControlRenderer, ObjectControlRendererTester } from './other/object.renderer';

export const ngZorroRenderers: {
  tester: RankedTester;
  renderer: any;
}[] = [
  // controls
  { tester: BooleanControlTester, renderer: BooleanControlRenderer },
  { tester: DateControlRendererTester, renderer: DateControlRenderer },
  { tester: NumberControlRendererTester, renderer: NumberControlRenderer },
  { tester: TextControlRendererTester, renderer: TextControlRenderer },
  // layouts
  { tester: CategorizationTester, renderer: CategorizationTabLayoutRenderer },
  { tester: GroupLayoutTester, renderer: GroupLayoutRenderer },
  { tester: HorizontalLayoutTester, renderer: HorizontalLayoutRenderer },
  { tester: VerticalLayoutTester, renderer: VerticalLayoutRenderer },
  // other
  { tester: ObjectControlRendererTester, renderer: ObjectControlRenderer },
];
