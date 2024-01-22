export type MultiselectExternalDictionaryItem = {
  label: string;
  value: string;
  checked?: boolean;

  [key: string]: any;
};

export interface MentionDictionaryItem {
  avatar?: string;
  email: string;
  name: string;

  [key: string]: any;
}

export interface Config {
  restrict?: boolean;
  trim?: boolean;
  showRequiredAsterisk?: boolean;
  hideColon?: boolean;
  multiselectExternalDictionary?: Record<string, MultiselectExternalDictionaryItem[]>;
  mentionDictionary?: Record<string, MentionDictionaryItem[]>;
  disabledDateFn?: Record<string, (current: Date) => boolean>;
}
