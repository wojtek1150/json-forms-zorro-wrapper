import { UiSchemaControlBaseOptions } from '../uischema';

/**
 * Options for customizing the date control UI schema.
 *
 * @property dateFormat - The display format for the date. Default is 'yyyy-MM-dd'.
 * @property saveFormat - The format for saving the date value (optional).
 * @property showTime - Whether to display a time picker (optional).
 * @property disablePastDates - If true, disables selection of past dates (optional).
 * @property disabledDateFnKey - Key to a custom function in config.disabledDateFn to further restrict selectable dates (optional).
 * @property minDate - The minimum allowed date (inclusive) for selection. Should be a valid date string. eg. '2023-01-01' (optional).
 * @property maxDate - The maximum allowed date (inclusive) for selection. Should be a valid date string. eg. '2024-12-31' (optional).
 */
export interface DateControlUISchemaOptions extends UiSchemaControlBaseOptions {
  /**
   * The display format for the date.
   * @default 'yyyy-MM-dd'
   */
  dateFormat?: string;

  /**
   * The format to use for saving the date value.
   */
  saveFormat?: string;

  /**
   * Whether to show the time picker.
   */
  showTime?: boolean;

  /**
   * Whether to disable past dates.
   */
  disablePastDates?: boolean;

  /**
   * Key for a custom date disabling function from config.disabledDateFn.
   */
  disabledDateFnKey?: string;

  /**
   * The minimum allowed date (inclusive) for selection. Should be an ISO string (e.g. '2023-01-01').
   */
  minDate?: string;

  /**
   * The maximum allowed date (inclusive) for selection. Should be an ISO string (e.g. '2024-12-31').
   */
  maxDate?: string;
}
