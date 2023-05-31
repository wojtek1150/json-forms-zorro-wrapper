import { Actions, computeLabel, JsonFormsState, JsonSchema, OwnPropsOfControl, StatePropsOfControl } from '../core';
import { ChangeDetectorRef, Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { JsonFormsBaseRenderer } from './base.renderer';
import { JsonFormsAngularService } from './jsonforms.service';
import { merge } from 'lodash-es';
import { JFZControlElement } from '../other/uischema';
import { Config } from '../other/config';

@Directive({})
export abstract class JsonFormsAbstractControl<Props extends StatePropsOfControl>
  extends JsonFormsBaseRenderer<JFZControlElement>
  implements OnInit, OnDestroy
{
  @Input() id: string;
  @Input() disabled: boolean;
  @Input() visible: boolean;

  form: FormControl;
  data: any;
  label: string;
  placeholder: string;
  required: boolean;
  hideColonInLabel: boolean;
  showValidationStatus: boolean;
  description: string;
  error: string | null;
  scopedSchema: JsonSchema;
  rootSchema: JsonSchema;
  isEnabled: boolean;
  hidden: boolean;
  propsPath: string;
  config: Config;

  private readonly destroy$ = new Subject<void>();

  constructor(protected jsonFormsService: JsonFormsAngularService, protected changeDetectorRef: ChangeDetectorRef) {
    super();
    this.form = new FormControl(
      {
        value: null,
        disabled: true,
      },
      {
        updateOn: 'change',
        validators: this.validator(),
      }
    );
  }

  get labelIcon(): string | undefined {
    return this.uischema.labelIcon;
  }

  get errorMessage(): string | null {
    return this.scopedSchema['errorMessage'] || this.error;
  }

  getEventValue = (event: any) => event.value;

  onChange(ev: any) {
    this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => this.getEventValue(ev)));
    this.triggerValidation();
  }

  shouldShowUnfocusedDescription(): boolean {
    const config = this.jsonFormsService.getState().jsonforms.config;
    const appliedUiSchemaOptions = merge({}, config, this.uischema.options);
    return !!appliedUiSchemaOptions.showUnfocusedDescription;
  }

  ngOnInit() {
    this.jsonFormsService.$state.pipe(takeUntil(this.destroy$)).subscribe({
      next: (state: JsonFormsState) => {
        const props = this.mapToProps(state);
        const { data, enabled, errors, label, required, schema, rootSchema, visible, path, config } = props;
        this.label = computeLabel(label, required, config ? !config.showRequiredAsterisk : true);
        this.config = config;
        this.data = data;
        this.error = errors;
        this.isEnabled = enabled;
        this.hideColonInLabel = !!config.hideColon;
        this.isEnabled ? this.form.enable() : this.form.disable();
        this.hidden = !visible;
        this.scopedSchema = schema;
        this.rootSchema = rootSchema;
        this.description = this.scopedSchema !== undefined ? this.scopedSchema.description : this.uischema.description || '';
        this.id = props.id;
        this.required = required;
        if (this.form.value !== data) {
          this.form.setValue(data);
        }
        this.propsPath = path;
        this.mapAdditionalProps(props);
      },
    });
    this.jsonFormsService.$submitState.pipe(takeUntil(this.destroy$)).subscribe(value => value && this.triggerValidation());
  }

  validator(): ValidatorFn {
    return (c: AbstractControl): ValidationErrors | null => (c.touched && this.error ? { error: this.error } : null);
  }

  mapAdditionalProps(props: Props) {
    this.placeholder = this.uischema.placeholder || '';
    this.showValidationStatus = !!this.uischema.options?.showValidationStatus;
    this.changeDetectorRef.markForCheck();
    // do nothing by default
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  triggerValidation() {
    this.form.markAsTouched();
    this.form.updateValueAndValidity();
    this.changeDetectorRef.markForCheck();
  }

  protected override getOwnProps(): OwnPropsOfControl {
    const props: OwnPropsOfControl = {
      uischema: this.uischema,
      schema: this.schema,
      path: this.path,
      id: this.id,
    };
    if (this.disabled !== undefined) {
      props.enabled = !this.disabled;
    }
    if (this.visible !== undefined) {
      props.visible = this.visible;
    }
    return props;
  }

  protected abstract mapToProps(state: JsonFormsState): Props;
}
