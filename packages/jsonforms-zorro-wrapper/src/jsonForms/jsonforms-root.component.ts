import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { Actions, JsonFormsI18nState, JsonFormsRendererRegistryEntry, JsonSchema, UISchemaTester, ValidationMode } from '@jsonforms/core';
import Ajv, { ErrorObject } from 'ajv';
import { JsonFormsAngularService, USE_STATE_VALUE } from './jsonforms.service';
import { JFZElement } from '../other/uischema';
import { Subject, takeUntil } from 'rxjs';
import { Config } from '../other/config';

@Component({
  selector: 'jsonforms',
  template: '<jsonforms-outlet></jsonforms-outlet>',
  providers: [JsonFormsAngularService],
})
export class JsonForms implements OnChanges, OnInit, OnDestroy {
  @Input() uischema: JFZElement;
  @Input() schema: JsonSchema;
  @Input() data: any;
  @Input() renderers: JsonFormsRendererRegistryEntry[];
  @Input() uischemas: { tester: UISchemaTester; uischema: JFZElement }[];
  @Input() readonly: boolean;
  @Input() submitLoading: boolean;
  @Input() validationMode: ValidationMode;
  @Input() ajv: Ajv;
  @Input() config: Config;
  @Input() i18n: JsonFormsI18nState;
  @Input() additionalErrors: ErrorObject[];
  @Output() dataChange = new EventEmitter<any>();
  @Output() errors = new EventEmitter<ErrorObject[]>();
  @Output() submited = new EventEmitter<any>();
  @Output() stepChanged = new EventEmitter<{ step: number; data: any }>();
  oldI18N: JsonFormsI18nState;
  private previousData: any;
  private previousErrors: ErrorObject[];

  private destroy$ = new Subject();

  private initialized = false;

  constructor(private service: JsonFormsAngularService) {}

  @Input()
  set initStepIndex(index: number) {
    if (this.service) {
      this.service.step = index;
    }
  }

  ngOnInit(): void {
    this.service.init({
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
      submitLoading: this.submitLoading,
    });
    this.service.$state.pipe(takeUntil(this.destroy$)).subscribe(state => {
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
    this.service.$submitState.pipe(takeUntil(this.destroy$)).subscribe(value => this.submited.emit(value));
    this.service.$stepChangeState.pipe(takeUntil(this.destroy$)).subscribe(value => this.stepChanged.emit(value));
  }

  ngDoCheck(): void {
    // we can't use ngOnChanges as then nested i18n changes will not be detected
    // the update will result in a no-op when the parameters did not change
    if (
      this.oldI18N?.locale !== this.i18n?.locale ||
      this.oldI18N?.translate !== this.i18n?.translate ||
      this.oldI18N?.translateError !== this.i18n?.translateError
    ) {
      this.service.updateI18n(
        Actions.updateI18n(
          this.oldI18N?.locale === this.i18n?.locale ? this.service.getState().jsonforms.i18n.locale : this.i18n?.locale,
          this.oldI18N?.translate === this.i18n?.translate ? this.service.getState().jsonforms.i18n.translate : this.i18n?.translate,
          this.oldI18N?.translateError === this.i18n?.translateError
            ? this.service.getState().jsonforms.i18n.translateError
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
    const newSubmitLoading = changes['submitLoading'];
    const newValidationMode = changes['validationMode'];
    const newAjv = changes['ajv'];
    const newConfig = changes['config'];
    const newAdditionalErrors = changes['additionalErrors'];

    if (newData || newSchema || newUiSchema || newValidationMode || newAjv || newAdditionalErrors) {
      this.service.updateCoreState(
        newData ? newData.currentValue : USE_STATE_VALUE,
        newSchema ? newSchema.currentValue : USE_STATE_VALUE,
        newUiSchema ? newUiSchema.currentValue : USE_STATE_VALUE,
        newAjv ? newAjv.currentValue : USE_STATE_VALUE,
        newValidationMode ? newValidationMode.currentValue : USE_STATE_VALUE,
        newAdditionalErrors ? newAdditionalErrors.currentValue : USE_STATE_VALUE
      );
    }

    if (newRenderers && !newRenderers.isFirstChange()) {
      this.service.setRenderers(newRenderers.currentValue);
    }

    if (newUischemas && !newUischemas.isFirstChange()) {
      this.service.setUiSchemas(newUischemas.currentValue);
    }

    if (newI18n && !newI18n.isFirstChange()) {
      this.service.updateI18n(
        Actions.updateI18n(newI18n.currentValue?.locale, newI18n.currentValue?.translate, newI18n.currentValue?.translateError)
      );
    }

    if (newReadonly && !newReadonly.isFirstChange()) {
      this.service.setReadonly(newReadonly.currentValue);
    }

    if (newSubmitLoading && !newSubmitLoading.isFirstChange()) {
      this.service.setSubmitLoading(newSubmitLoading.currentValue);
    }

    if (newConfig && !newConfig.isFirstChange()) {
      this.service.updateConfig(Actions.setConfig(newConfig.currentValue));
    }
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }

  public submit() {
    this.service.submitForm();
  }
}
