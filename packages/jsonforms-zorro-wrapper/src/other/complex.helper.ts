import { JsonSchema } from '@jsonforms/core';
import { UISchemaElement } from '@jsonforms/core/src/models';
import isEmpty from 'lodash/isEmpty';
import { Tester } from '@jsonforms/core/src/testers/testers';

export const hasOneOfItems = (schema: JsonSchema): boolean =>
  schema.oneOf !== undefined &&
  schema.oneOf.length > 0 &&
  (schema.oneOf as JsonSchema[]).every((entry: JsonSchema) => {
    return entry.const !== undefined;
  });

export const hasEnumItems = (schema: JsonSchema): boolean => schema.type === 'string' && schema.enum !== undefined;

export const hasOption =
  (optionName: string): Tester =>
  (uischema: UISchemaElement): boolean => {
    if (isEmpty(uischema)) {
      return false;
    }

    const options = uischema.options;
    return !isEmpty(options) && !!options[optionName];
  };
