import { Actions, computeLabel, ControlElement, JsonFormsState, JsonSchema, OwnPropsOfControl, StatePropsOfControl } from '@jsonforms/core';
import { Directive, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

import { JsonFormsBaseRenderer } from './base.renderer';
import { JsonFormsAngularService } from './jsonforms.service';
import { merge } from 'lodash-es';
import { ZorroControlElement } from '../other/uischema';

@Directive({})
export abstract class JsonFormsAbstractControl<Props extends StatePropsOfControl>
  extends JsonFormsBaseRenderer<ControlElement>
  implements OnInit, OnDestroy
{
  @Input() id: string;
  @Input() disabled: boolean;
  @Input() visible: boolean;

  form: FormControl;
  data: any;
  label: string;
  placeholder: string;
  description: string;
  error: string | null;
  scopedSchema: JsonSchema;
  rootSchema: JsonSchema;
  enabled: boolean;
  hidden: boolean;
  propsPath: string;

  private destroy$ = new Subject();

  constructor(protected jsonFormsService: JsonFormsAngularService) {
    super();
    this.form = new FormControl(
      {
        value: null,
        disabled: true,
      },
      {
        updateOn: 'change',
        validators: this.validator.bind(this),
      }
    );
  }

  get labelIcon(): string | undefined {
    return this.uischema['labelIcon'];
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
        this.label = computeLabel(label, required, config ? config.hideRequiredAsterisk : false);
        this.data = data;
        this.error = errors;
        this.enabled = enabled;
        this.isEnabled() ? this.form.enable() : this.form.disable();
        this.hidden = !visible;
        this.scopedSchema = schema;
        this.rootSchema = rootSchema;
        this.description = this.scopedSchema !== undefined ? this.scopedSchema.description : '';
        this.id = props.id;
        if (this.form.value !== data) {
          this.form.setValue(data);
        }
        this.propsPath = path;
        this.mapAdditionalProps(props);
      },
    });
    this.jsonFormsService.$submitState.pipe(takeUntil(this.destroy$)).subscribe(value => value && this.triggerValidation());
  }

  validator: ValidatorFn = (_c: AbstractControl): ValidationErrors | null => {
    return _c.touched && this.error ? { error: this.error } : null;
  };

  // @ts-ignore
  mapAdditionalProps(props: Props) {
    const placeholder = (this.uischema as ZorroControlElement).placeholder ?? this.label;
    this.placeholder = placeholder || '';
    // do nothing by default
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }

  isEnabled(): boolean {
    return this.enabled;
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

  triggerValidation() {
    // these cause the correct update of the error underline, seems to be
    // related to ionic-team/ionic#11640
    this.form.markAsTouched();
    this.form.updateValueAndValidity();
  }
}
