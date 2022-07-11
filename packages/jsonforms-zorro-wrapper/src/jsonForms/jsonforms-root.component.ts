import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {
  Actions,
  JsonFormsI18nState,
  JsonFormsRendererRegistryEntry,
  JsonSchema,
  UISchemaElement,
  UISchemaTester,
  ValidationMode,
} from '@jsonforms/core';
import Ajv, { ErrorObject } from 'ajv';
import { JsonFormsAngularService, USE_STATE_VALUE } from './jsonforms.service';

@Component({
  selector: 'jsonforms',
  template: '<jsonforms-outlet></jsonforms-outlet>',
  providers: [JsonFormsAngularService],
})
export class JsonForms implements OnChanges, OnInit {
  @Input() uischema: UISchemaElement;
  @Input() schema: JsonSchema;
  @Input() data: any;
  @Input() renderers: JsonFormsRendererRegistryEntry[];
  @Input() uischemas: { tester: UISchemaTester; uischema: UISchemaElement }[];
  @Output() dataChange = new EventEmitter<any>();
  @Input() readonly: boolean;
  @Input() validationMode: ValidationMode;
  @Input() ajv: Ajv;
  @Input() config: any;
  @Input() i18n: JsonFormsI18nState;
  @Input() additionalErrors: ErrorObject[];
  @Output() errors = new EventEmitter<ErrorObject[]>();
  @Output() submited = new EventEmitter<any>();

  private previousData: any;
  private previousErrors: ErrorObject[];

  private initialized = false;
  oldI18N: JsonFormsI18nState;

  constructor(private jsonformsService: JsonFormsAngularService) {}

  ngOnInit(): void {
    this.jsonformsService.init({
      core: {
        data: this.data,
        uischema: this.uischema,
        schema: this.schema,
        ajv: this.ajv,
        validationMode: this.validationMode,
        additionalErrors: this.additionalErrors,
      },
      uischemas: this.uischemas,
      i18n: this.i18n,
      renderers: this.renderers,
      config: this.config,
      readonly: this.readonly,
    });
    this.jsonformsService.$state.subscribe(state => {
      const data = state?.jsonforms?.core?.data;
      const errors = state?.jsonforms?.core?.errors;
      if (this.previousData !== data) {
        this.previousData = data;
        this.dataChange.emit(data);
      }
      if (this.previousErrors !== errors) {
        this.previousErrors = errors;
        this.errors.emit(errors);
      }
    });
    this.oldI18N = this.i18n;
    this.initialized = true;
    this.jsonformsService.$submitState.subscribe(value => this.submited.emit(value));
  }

  ngDoCheck(): void {
    // we can't use ngOnChanges as then nested i18n changes will not be detected
    // the update will result in a no-op when the parameters did not change
    if (
      this.oldI18N?.locale !== this.i18n?.locale ||
      this.oldI18N?.translate !== this.i18n?.translate ||
      this.oldI18N?.translateError !== this.i18n?.translateError
    ) {
      this.jsonformsService.updateI18n(
        Actions.updateI18n(
          this.oldI18N?.locale === this.i18n?.locale ? this.jsonformsService.getState().jsonforms.i18n.locale : this.i18n?.locale,
          this.oldI18N?.translate === this.i18n?.translate ? this.jsonformsService.getState().jsonforms.i18n.translate : this.i18n?.translate,
          this.oldI18N?.translateError === this.i18n?.translateError
            ? this.jsonformsService.getState().jsonforms.i18n.translateError
            : this.i18n?.translateError
        )
      );
      this.oldI18N = this.i18n;
    }
  }

  // tslint:disable-next-line: cyclomatic-complexity
  ngOnChanges(changes: SimpleChanges): void {
    if (!this.initialized) {
      return;
    }
    const newData = changes['data'];
    const newSchema = changes['schema'];
    const newUiSchema = changes['uischema'];
    const newRenderers = changes['renderers'];
    const newUischemas = changes['uischemas'];
    const newI18n = changes['i18n'];
    const newReadonly = changes['readonly'];
    const newValidationMode = changes['validationMode'];
    const newAjv = changes['ajv'];
    const newConfig = changes['config'];
    const newAdditionalErrors = changes['additionalErrors'];

    if (newData || newSchema || newUiSchema || newValidationMode || newAjv || newAdditionalErrors) {
      this.jsonformsService.updateCoreState(
        newData ? newData.currentValue : USE_STATE_VALUE,
        newSchema ? newSchema.currentValue : USE_STATE_VALUE,
        newUiSchema ? newUiSchema.currentValue : USE_STATE_VALUE,
        newAjv ? newAjv.currentValue : USE_STATE_VALUE,
        newValidationMode ? newValidationMode.currentValue : USE_STATE_VALUE,
        newAdditionalErrors ? newAdditionalErrors.currentValue : USE_STATE_VALUE
      );
    }

    if (newRenderers && !newRenderers.isFirstChange()) {
      this.jsonformsService.setRenderers(newRenderers.currentValue);
    }

    if (newUischemas && !newUischemas.isFirstChange()) {
      this.jsonformsService.setUiSchemas(newUischemas.currentValue);
    }

    if (newI18n && !newI18n.isFirstChange()) {
      this.jsonformsService.updateI18n(
        Actions.updateI18n(newI18n.currentValue?.locale, newI18n.currentValue?.translate, newI18n.currentValue?.translateError)
      );
    }

    if (newReadonly && !newReadonly.isFirstChange()) {
      this.jsonformsService.setReadonly(newReadonly.currentValue);
    }

    if (newConfig && !newConfig.isFirstChange()) {
      this.jsonformsService.updateConfig(Actions.setConfig(newConfig.currentValue));
    }
  }
}
