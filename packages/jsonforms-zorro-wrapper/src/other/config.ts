export interface Config {
  restrict?: boolean;
  trim?: boolean;
  showRequiredAsterisk?: boolean;
  hideColon?: boolean;
  multiselectExternalDictionary?: Record<string, { label: string; value: string; checked?: boolean }[]>;

  [key: string]: any;
}
