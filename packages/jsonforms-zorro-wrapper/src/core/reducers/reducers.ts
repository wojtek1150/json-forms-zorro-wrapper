/*
  The MIT License

  Copyright (c) 2017-2019 EclipseSource Munich
  https://github.com/eclipsesource/jsonforms

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
*/

import { ControlElement, JsonSchema, UISchemaElement } from '../models';
import { coreReducer, errorAt, subErrorsAt } from './core';
import { defaultDataReducer } from './default-data';
import { rendererReducer } from './renderers';
import type { JsonFormsState } from '../store';
import type { JsonFormsUISchemaRegistryEntry } from './uischemas';
import { findMatchingUISchema, uischemaRegistryReducer } from './uischemas';
import { fetchErrorTranslator, fetchLocale, i18nReducer } from './i18n';

import { Generate } from '../generators';

import { cellReducer } from './cells';
import { configReducer } from './config';
import { fetchTranslator } from '.';
import type { ErrorTranslator, Translator } from '../i18n';
import { get } from 'lodash-es';

export const jsonFormsReducerConfig = {
  core: coreReducer,
  renderers: rendererReducer,
  cells: cellReducer,
  config: configReducer,
  uischemas: uischemaRegistryReducer,
  defaultData: defaultDataReducer,
  i18n: i18nReducer,
};

/**
 * Finds a registered UI schema to use, if any.
 * @param schema the JSON schema describing the data to be rendered
 * @param schemaPath the according schema path
 * @param path the instance path
 * @param fallback the type of the layout to use or a UI-schema-generator function
 * @param control may be checked for embedded inline uischema options
 */
export const findUISchema = (
  uischemas: JsonFormsUISchemaRegistryEntry[],
  schema: JsonSchema,
  schemaPath: string,
  path: string,
  fallback: string | (() => UISchemaElement) = 'VerticalLayout',
  control?: ControlElement,
  rootSchema?: JsonSchema,
): UISchemaElement => {
  // handle options
  if (control && control.options && control.options.detail) {
    if (typeof control.options.detail === 'string') {
      if (control.options.detail.toUpperCase() === 'GENERATE') {
        //use fallback generation function
        if (typeof fallback === 'function') {
          return fallback();
        }
        // force generation of uischema
        return Generate.uiSchema(schema, fallback);
      }
    } else if (typeof control.options.detail === 'object') {
      // check if detail is a valid uischema
      if (control.options.detail.type && typeof control.options.detail.type === 'string') {
        return control.options.detail as UISchemaElement;
      }
    }
  }
  // default
  const uiSchema = findMatchingUISchema(uischemas)(schema, schemaPath, path);
  if (uiSchema === undefined) {
    //use fallback generation function
    if (typeof fallback === 'function') {
      return fallback();
    }
    return Generate.uiSchema(schema, fallback, '#', rootSchema);
  }
  return uiSchema;
};

export const getErrorAt = (instancePath: string, schema: JsonSchema) => (state: JsonFormsState) => {
  return errorAt(instancePath, schema)(state.jsonforms.core);
};

export const getSubErrorsAt = (instancePath: string, schema: JsonSchema) => (state: JsonFormsState) =>
  subErrorsAt(instancePath, schema)(state.jsonforms.core);

export const getConfig = (state: JsonFormsState) => state.jsonforms.config;

export const getLocale = (state: JsonFormsState) => fetchLocale(get(state, 'jsonforms.i18n'));

export const getTranslator =
  () =>
  (state: JsonFormsState): Translator =>
    fetchTranslator(get(state, 'jsonforms.i18n'));

export const getErrorTranslator =
  () =>
  (state: JsonFormsState): ErrorTranslator =>
    fetchErrorTranslator(get(state, 'jsonforms.i18n'));
