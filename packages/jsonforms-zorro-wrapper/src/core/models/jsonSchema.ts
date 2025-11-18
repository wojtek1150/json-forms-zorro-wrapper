import type { JsonSchema7NonRecursive } from './jsonSchema7';

export type FormatRangeValue = string | { $data: string };

export interface AjvFormatRangeKeywords {
  formatMaximum?: FormatRangeValue;
  formatMinimum?: FormatRangeValue;
  formatExclusiveMaximum?: FormatRangeValue;
  formatExclusiveMinimum?: FormatRangeValue;
}

type JsonSchema7RecursiveOverrides = {
  items?: JsonSchema | JsonSchema[];
  additionalItems?: boolean | JsonSchema;
  additionalProperties?: boolean | JsonSchema;
  definitions?: { [key: string]: JsonSchema };
  properties?: { [property: string]: JsonSchema };
  patternProperties?: { [pattern: string]: JsonSchema };
  dependencies?: { [key: string]: JsonSchema | string[] };
  contains?: JsonSchema;
  propertyNames?: JsonSchema;
  allOf?: JsonSchema[];
  anyOf?: JsonSchema[];
  oneOf?: JsonSchema[];
  not?: JsonSchema;
  if?: JsonSchema;
  then?: JsonSchema;
  else?: JsonSchema;
};

export type JsonSchema = JsonSchema7NonRecursive & JsonSchema7RecursiveOverrides & AjvFormatRangeKeywords;
