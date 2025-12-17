import { JFZBuilderInputType, JFZBuilderLayoutType } from './model';

export const CONTROL_ICONS: Record<JFZBuilderInputType, string> = {
  [JFZBuilderInputType.TEXT]: 'font-size',
  [JFZBuilderInputType.TEXTAREA]: 'file-text',
  [JFZBuilderInputType.NUMBER]: 'number',
  [JFZBuilderInputType.BOOLEAN]: 'check-square',
  [JFZBuilderInputType.TOGGLE]: 'swap',
  [JFZBuilderInputType.DATE_PICKER]: 'calendar',
  [JFZBuilderInputType.DATE_RANGE]: 'calendar-range',
  [JFZBuilderInputType.SELECT]: 'down-circle',
  [JFZBuilderInputType.RADIO]: 'radar-chart',
  [JFZBuilderInputType.RADIO_BUTTON]: 'dot-chart',
  [JFZBuilderInputType.RANGE]: 'sliders',
  [JFZBuilderInputType.WYSIWYG]: 'edit',
  [JFZBuilderInputType.CHECKBOX_GROUP]: 'check-square',
  [JFZBuilderInputType.MULTISELECT]: 'unordered-list',
  [JFZBuilderInputType.MENTION]: 'at',
  [JFZBuilderInputType.IMAGE]: 'picture',
  [JFZBuilderInputType.GOOGLE_PLACES]: 'environment',
  [JFZBuilderInputType.COUNTRY_ISO]: 'global',
};

export const LAYOUT_ICONS: Record<JFZBuilderLayoutType, string> = {
  [JFZBuilderLayoutType.VERTICAL_LAYOUT]: 'align-left',
  [JFZBuilderLayoutType.HORIZONTAL_LAYOUT]: 'menu',
  [JFZBuilderLayoutType.GROUP]: 'appstore',
  [JFZBuilderLayoutType.CARD_GROUP]: 'idcard',
  [JFZBuilderLayoutType.CATEGORIZATION]: 'appstore-add',
  [JFZBuilderLayoutType.STEPPER]: 'step-forward',
  [JFZBuilderLayoutType.ARRAY_LAYOUT]: 'unordered-list',
};
