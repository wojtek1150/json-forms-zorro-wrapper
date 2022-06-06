import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { Actions, isIntegerControl, isNumberControl, or, RankedTester, rankWith, StatePropsOfControl } from '@jsonforms/core';

@Component({
  selector: 'NumberControlRenderer',
  template: `
    <nz-form-item>
      <nz-form-label *ngIf="description" [nzFor]="id">{{description}}</nz-form-label>
      <nz-form-control nzHasFeedback [nzErrorTip]="error" [nzValidateStatus]="form.status | nzValidationStatus">
        <nz-input-number
          [id]="id"
          [formControl]="form"
          [nzMin]="min"
          [nzMax]="max"
          [nzStep]="stepper"
          [nzPlaceHolder]="label"
          [nzDisabled]="!isEnabled()"
          (ngModelChange)="onChange($event)"
        ></nz-input-number>
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberControlRenderer extends JsonFormsControl {
  oldValue: string;
  min: number;
  max: number;
  stepper: number;

  selectedValue: number;

  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
  }

  override getEventValue = (event: number) => event;

  override onChange(ev: number) {
    if (this.selectedValue !== ev) {
      this.selectedValue = ev;
      this.jsonFormsService.updateCore(
        Actions.update(this.propsPath, () => ev)
      );
      this.triggerValidation();
    }
  }

  override mapAdditionalProps(props: StatePropsOfControl) {
    if (this.scopedSchema) {
      const defaultStep = isNumberControl(this.uischema, this.rootSchema, this.rootSchema)
        ? 0.1
        : 1;
      this.min = this.scopedSchema.minimum;
      this.max = this.scopedSchema.maximum;
      this.stepper = this.scopedSchema.multipleOf || defaultStep;
    }
  }
}

export const NumberControlRendererTester: RankedTester = rankWith(
  2,
  or(isNumberControl, isIntegerControl)
);
