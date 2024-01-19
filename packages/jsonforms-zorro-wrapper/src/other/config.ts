type MultiselectExternalDictionaryItem = { label: string; value: string; checked?: boolean } & Record<string, any>
type MentionDictionaryItem = { avatar?: string; email: string; name: string } & Record<string, any>

export interface Config {
  restrict?: boolean;
  trim?: boolean;
  showRequiredAsterisk?: boolean;
  hideColon?: boolean;
  multiselectExternalDictionary?: MultiselectExternalDictionaryItem[];
  mentionDictionary?: MentionDictionaryItem[];
  disabledDateFn?: Record<string, (current: Date) => boolean>;

  [key: string]: any;
}
