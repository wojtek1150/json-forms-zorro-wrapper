export type MultiselectExternalDictionaryItem = {
  label: string;
  value: any;
  unsupported?: boolean;
  additionalLabel?: string;
  additionalLabelColor?: string;

  [key: string]: any;
};

export type SelectExternalDictionaryItem = {
  label: string;
  value: any;
  unsupported?: boolean;
  additionalLabel?: string;
  additionalLabelColor?: string;
};

export interface MentionDictionaryItem {
  avatar?: string;
  email?: string;
  name: string;

  [key: string]: any;
}

import { DisabledTimeFn } from 'ng-zorro-antd/date-picker';

export interface Config {
  restrict?: boolean;
  trim?: boolean;
  showRequiredAsterisk?: boolean;
  hideColon?: boolean;
  multiselectExternalDictionary?: Record<string, MultiselectExternalDictionaryItem[]>;
  selectExternalDictionary?: Record<string, SelectExternalDictionaryItem[]>;
  mentionDictionary?: Record<string, MentionDictionaryItem[]>;
  fieldsWithWarningHint?: Record<string, string>;
  disabledDateFn?: Record<string, (current: Date) => boolean>;
  disabledTimeFn?: Record<string, DisabledTimeFn>;
}
