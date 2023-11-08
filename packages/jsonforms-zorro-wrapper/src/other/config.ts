export interface Config {
  restrict?: boolean;
  trim?: boolean;
  showRequiredAsterisk?: boolean;
  hideColon?: boolean;
  multiselectExternalDictionary?: Record<string, { label: string; value: string; checked?: boolean }[]>;
  mentionDictionary?: Record<string, { avatar: string; email: string; name: string }[]>;

  [key: string]: any;
}
