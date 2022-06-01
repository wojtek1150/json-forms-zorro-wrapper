import { RankedTester } from '@jsonforms/core';
import { TextControlRenderer, TextControlRendererTester } from './controls/text.render';
import { DateControlRenderer, DateControlRendererTester } from './controls/date';
import { HorizontalLayoutRenderer, horizontalLayoutTester } from './layouts/horizontal-layout';

export const ngZorroRenderers: {
  tester: RankedTester;
  renderer: any;
}[] = [
  // controls
  { tester: TextControlRendererTester, renderer: TextControlRenderer },
  { tester: DateControlRendererTester, renderer: DateControlRenderer },
  // layouts
  { tester: horizontalLayoutTester, renderer: HorizontalLayoutRenderer },
  // other
];
