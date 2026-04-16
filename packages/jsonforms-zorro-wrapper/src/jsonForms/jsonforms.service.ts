import {
  Actions,
  configReducer,
  CoreActions,
  coreReducer,
  generateDefaultUISchema,
  generateJsonSchema,
  getData,
  getErrors,
  I18nActions,
  i18nReducer,
  JsonFormsRendererRegistryEntry,
  JsonFormsState,
  JsonFormsSubStates,
  JsonSchema,
  RankedTester,
  setConfig,
  SetConfigAction,
  UISchemaActions,
  UISchemaElement,
  uischemaRegistryReducer,
  UISchemaTester,
  updateI18n,
  ValidationMode,
} from '../core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { JsonFormsBaseRenderer } from './base.renderer';

import { cloneDeep } from 'lodash-es';
import Ajv, { ErrorObject } from 'ajv';
import { Injectable } from '@angular/core';
import { JFZElement } from '../models/uischema';
import { Config } from '../models/config';

export const USE_STATE_VALUE = Symbol('Marker to use state value');

@Injectable({ providedIn: 'root' })
export class JsonFormsAngularService {
  private _state: JsonFormsSubStates;
  private state: BehaviorSubject<JsonFormsState>;
  private submit: BehaviorSubject<any>;
  private cancel: BehaviorSubject<void>;
  private stepChange: BehaviorSubject<{ step: number; data: null }>;
  private baseSchema: JsonSchema;

  private _step = 0;

  set step(value: number) {
    this._step = value;
  }

  get $state(): Observable<JsonFormsState> {
    if (!this.state) {
      throw new Error('Please call init first!');
    }
    return this.state.asObservable();
  }

  get $submitState(): Observable<any> {
    if (!this.submit) {
      throw new Error('Please call init first!');
    }
    return this.submit.asObservable();
  }

  get $cancelState(): Observable<void> {
    if (!this.cancel) {
      throw new Error('Please call init first!');
    }
    return this.cancel.asObservable();
  }

  get $stepChangeState(): Observable<any> {
    if (!this.stepChange) {
      throw new Error('Please call init first!');
    }
    return this.stepChange.asObservable();
  }

  get $formValue(): Observable<any> {
    if (!this.state) {
      throw new Error('Please call init first!');
    }
    return this.state.asObservable().pipe(map(state => getData(state)));
  }

  get $allErrors(): Observable<any> {
    if (!this.state) {
      throw new Error('Please call init first!');
    }
    return this.state.asObservable().pipe(map(state => getErrors(state)));
  }

  init(
    initialState: JsonFormsSubStates = {
      core: { data: undefined, schema: undefined, uischema: undefined, validationMode: 'ValidateAndShow', additionalErrors: undefined },
    },
  ) {
    this._state = initialState;
    this._state.config = configReducer(undefined, setConfig(this._state.config));
    this._state.i18n = i18nReducer(
      this._state.i18n,
      updateI18n(this._state.i18n?.locale, this._state.i18n?.translate, this._state.i18n?.translateError),
    );
    this.state = new BehaviorSubject({ jsonforms: this._state });
    this.submit = new BehaviorSubject(null);
    this.cancel = new BehaviorSubject(null);
    this.stepChange = new BehaviorSubject({ step: this._step, data: null });
    const data = initialState.core.data;
    const schema = initialState.core.schema ?? generateJsonSchema(data);
    this.baseSchema = schema;
    const uischema = initialState.core.uischema ?? generateDefaultUISchema(schema);
    const hydratedSchema = this.hydrateSchemaWithExternalDictionary(schema, uischema, this._state.config);
    this.updateCore(Actions.init(this.updateDataWithPlainTextFields(data, uischema), hydratedSchema, uischema));
  }

  updateDataWithPlainTextFields(data: Object, uiSchema: UISchemaElement): Object {
    const updatedData = { ...data };
    const processObject = (obj, schema: any) => {
      schema.elements?.forEach(element => {
        // Check if this is a control with `withStringValidation` in options
        if (element.type === 'Control' && element.options?.withStringValidation) {
          const fieldPath = element.scope.replace('#/properties/', '').split('/properties/');
          const fieldKey = fieldPath.pop(); // The actual key of the field
          const nestedKey = fieldPath.reduce((acc, part) => acc && acc[part], obj);

          // Check if this field exists in the `data`
          if (nestedKey && nestedKey[fieldKey]) {
            // Extract plain text from HTML
            const plainTextValue = nestedKey[fieldKey].replace(/<\/?[^>]+(>|$)/g, '');

            // Add a new field with "_plain_text" suffix
            nestedKey[`${fieldKey}_plain_text`] = plainTextValue;
          }
        }

        // If nested elements are present, recurse
        if (element.elements) {
          processObject(obj, element);
        }
      });
    };

    // Start processing the data object based on the uiSchema
    processObject(updatedData, uiSchema);

    return updatedData;
  }

  /**
   * @deprecated use {@link JsonFormsAngularService.addRenderer}
   */
  registerRenderer(renderer: JsonFormsBaseRenderer<JFZElement>, tester: RankedTester): void {
    this.addRenderer(renderer, tester);
  }

  addRenderer(renderer: JsonFormsBaseRenderer<JFZElement>, tester: RankedTester): void {
    this._state.renderers.push({ renderer, tester });
    this.updateSubject();
  }

  /**
   * @deprecated use {@link JsonFormsAngularService.setRenderer}
   */
  registerRenderers(renderers: JsonFormsRendererRegistryEntry[]): void {
    this.setRenderers(renderers);
  }

  setRenderers(renderers: JsonFormsRendererRegistryEntry[]): void {
    this._state.renderers = renderers;
    this.updateSubject();
  }

  /**
   * @deprecated use {@link JsonFormsAngularService.removeRenderer}
   */
  unregisterRenderer(tester: RankedTester): void {
    this.removeRenderer(tester);
  }

  removeRenderer(tester: RankedTester): void {
    const findIndex = this._state.renderers.findIndex(v => v.tester === tester);
    if (findIndex === -1) {
      return;
    }
    const renderers = this._state.renderers.filter(v => v.tester !== tester);
    this._state.renderers = renderers;
    this.updateSubject();
  }

  updateValidationMode(validationMode: ValidationMode): void {
    const coreState = coreReducer(this._state.core, Actions.setValidationMode(validationMode));
    this._state.core = coreState;
    this.updateSubject();
  }

  updateI18n<T extends I18nActions>(i18nAction: T): T {
    const i18nState = i18nReducer(this._state.i18n, i18nAction);
    if (i18nState !== this._state.i18n) {
      this._state.i18n = i18nState;
      this.updateSubject();
    }
    return i18nAction;
  }

  updateCore<T extends CoreActions>(coreAction: T): T {
    const coreState = coreReducer(this._state.core, coreAction);
    if (coreState !== this._state.core) {
      this._state.core = coreState;
      this.updateSubject();
    }
    return coreAction;
  }

  /**
   * @deprecated use {@link JsonFormsAngularService.setUiSchemas}
   */
  updateUiSchema<T extends UISchemaActions>(uischemaAction: T): T {
    const uischemaState = uischemaRegistryReducer(this._state.uischemas, uischemaAction);
    this._state.uischemas = uischemaState;
    this.updateSubject();
    return uischemaAction;
  }

  setUiSchemas(uischemas: { tester: UISchemaTester; uischema: UISchemaElement }[]): void {
    this._state.uischemas = uischemas;
    this.updateSubject();
  }

  updateConfig<T extends SetConfigAction>(setConfigAction: T): T {
    const configState = configReducer(this._state.config, setConfigAction);
    this._state.config = configState;
    const hydratedSchema = this.hydrateSchemaWithExternalDictionary(
      this.baseSchema ?? this._state.core.schema,
      this._state.core.uischema,
      configState,
    );
    this._state.core = coreReducer(this._state.core, Actions.updateCore(this._state.core.data, hydratedSchema, this._state.core.uischema));
    this.updateSubject();
    return setConfigAction;
  }

  setUiSchema(uischema: UISchemaElement | undefined): void {
    const newUiSchema = uischema ?? generateDefaultUISchema(this._state.core.schema);
    const hydratedSchema = this.hydrateSchemaWithExternalDictionary(this.baseSchema ?? this._state.core.schema, newUiSchema, this._state.config);
    const coreState = coreReducer(this._state.core, Actions.updateCore(this._state.core.data, hydratedSchema, newUiSchema));
    if (coreState !== this._state.core) {
      this._state.core = coreState;
      this.updateSubject();
    }
  }

  setSchema(schema: JsonSchema | undefined): void {
    const schemaWithDefault = schema ?? generateJsonSchema(this._state.core.data);
    this.baseSchema = schemaWithDefault;
    const hydratedSchema = this.hydrateSchemaWithExternalDictionary(schemaWithDefault, this._state.core.uischema, this._state.config);
    const coreState = coreReducer(this._state.core, Actions.updateCore(this._state.core.data, hydratedSchema, this._state.core.uischema));
    if (coreState !== this._state.core) {
      this._state.core = coreState;
      this.updateSubject();
    }
  }

  setData(data: any): void {
    const coreState = coreReducer(this._state.core, Actions.updateCore(data, this._state.core.schema, this._state.core.uischema));
    if (coreState !== this._state.core) {
      this._state.core = coreState;
      this.updateSubject();
    }
  }

  setLocale(locale: string): void {
    this._state.i18n.locale = locale;
    this.updateSubject();
  }

  setReadonly(readonly: boolean): void {
    this._state.readonly = readonly;
    this.updateSubject();
  }

  setSubmitLoading(loading: boolean): void {
    this._state.submitLoading = loading;
    this.updateSubject();
  }

  getState(): JsonFormsState {
    return cloneDeep({ jsonforms: this._state });
  }

  refresh(): void {
    this.updateSubject();
  }

  submitForm(): void {
    this.submit.next(this._state?.core?.data || {});
  }

  cancelForm(): void {
    this.cancel.next();
  }

  changeStep(step: number): void {
    this.stepChange.next({ step, data: this._state?.core?.data });
  }

  updateCoreState(
    data: any | typeof USE_STATE_VALUE,
    schema: JsonSchema | typeof USE_STATE_VALUE,
    uischema: UISchemaElement | typeof USE_STATE_VALUE,
    ajv: Ajv | typeof USE_STATE_VALUE,
    validationMode: ValidationMode | typeof USE_STATE_VALUE,
    additionalErrors: ErrorObject[] | typeof USE_STATE_VALUE,
  ): void {
    const newData = data === USE_STATE_VALUE ? this._state.core.data : data;
    const schemaProvided = schema !== USE_STATE_VALUE;
    const newSchema = schemaProvided ? (schema ?? generateJsonSchema(newData)) : this._state.core.schema;
    if (schemaProvided) {
      this.baseSchema = newSchema;
    }
    const newUischema = uischema === USE_STATE_VALUE ? this._state.core.uischema : (uischema ?? generateDefaultUISchema(newSchema));
    const schemaForValidation =
      schemaProvided || uischema !== USE_STATE_VALUE
        ? this.hydrateSchemaWithExternalDictionary(this.baseSchema ?? newSchema, newUischema, this._state.config)
        : newSchema;
    const newAjv = ajv === USE_STATE_VALUE ? this._state.core.ajv : ajv;
    const newValidationMode = validationMode === USE_STATE_VALUE ? this._state.core.validationMode : validationMode;
    const newAdditionalErrors = additionalErrors === USE_STATE_VALUE ? this._state.core.additionalErrors : additionalErrors;
    this.updateCore(
      Actions.updateCore(newData, schemaForValidation, newUischema, {
        ajv: newAjv,
        validationMode: newValidationMode,
        additionalErrors: newAdditionalErrors,
      }),
    );
  }

  private updateSubject(): void {
    this.state.next({ jsonforms: this._state });
  }

  private hydrateSchemaWithExternalDictionary(schema: JsonSchema, uiSchema: UISchemaElement, config: Config): JsonSchema {
    if (!schema || !uiSchema || !config) {
      return schema;
    }

    const controlsWithDictionary = this.collectControlsWithDictionary(uiSchema);
    if (!controlsWithDictionary.length) {
      return schema;
    }

    const hydratedSchema = cloneDeep(schema);

    for (const control of controlsWithDictionary) {
      const dictionaryItems = this.getDictionaryItems(control.dictionaryKey, control.format, config);
      if (!dictionaryItems.length) {
        continue;
      }

      const targetSchema = this.resolveScopeSchema(hydratedSchema, control.scope);
      if (!targetSchema || Array.isArray(targetSchema)) {
        continue;
      }

      if (control.format === 'multiselect' || targetSchema.type === 'array') {
        if (!targetSchema.items || Array.isArray(targetSchema.items)) {
          continue;
        }
        const itemSchema = targetSchema.items as JsonSchema;
        itemSchema.enum = dictionaryItems.map(item => item.value);
        if (itemSchema.oneOf) {
          itemSchema.oneOf = dictionaryItems.map(item => ({ const: item.value, title: item.label }));
        }
      } else {
        targetSchema.enum = dictionaryItems.map(item => item.value);
        if (targetSchema.oneOf) {
          targetSchema.oneOf = dictionaryItems.map(item => ({ const: item.value, title: item.label }));
        }
      }
    }

    return hydratedSchema;
  }

  private collectControlsWithDictionary(uiSchema: UISchemaElement): { scope: string; dictionaryKey: string; format?: string }[] {
    const controls: { scope: string; dictionaryKey: string; format?: string }[] = [];
    const queue: any[] = [uiSchema];

    while (queue.length) {
      const current = queue.shift();
      if (!current || typeof current !== 'object') {
        continue;
      }

      if (current.type === 'Control' && typeof current.scope === 'string') {
        const dictionaryKey = current.options?.dictionaryKey;
        if (typeof dictionaryKey === 'string' && dictionaryKey.length > 0) {
          controls.push({
            scope: current.scope,
            dictionaryKey,
            format: current.options?.format,
          });
        }
      }

      if (Array.isArray(current.elements)) {
        queue.push(...current.elements);
      }
    }

    return controls;
  }

  private resolveScopeSchema(rootSchema: JsonSchema, scope: string): JsonSchema | undefined {
    if (!scope || !scope.startsWith('#/')) {
      return undefined;
    }

    const schemaPath = scope.slice(2).split('/');
    let current: any = rootSchema;

    for (const segment of schemaPath) {
      if (!segment) {
        continue;
      }

      current = current?.[segment];
      if (current === undefined) {
        return undefined;
      }
    }

    return current as JsonSchema;
  }

  private getDictionaryItems(dictionaryKey: string, format: string | undefined, config: Config): { label: string; value: any }[] {
    const selectItems = (config.selectExternalDictionary?.[dictionaryKey] ?? []) as { label: string; value: any }[];
    const multiselectItems = (config.multiselectExternalDictionary?.[dictionaryKey] ?? []) as { label: string; value: any }[];

    if (format === 'multiselect') {
      return multiselectItems.length ? multiselectItems : selectItems;
    }

    if (format === 'select') {
      return selectItems.length ? selectItems : multiselectItems;
    }

    return selectItems.length ? selectItems : multiselectItems;
  }
}
