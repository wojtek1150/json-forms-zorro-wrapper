import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { Actions, isIntegerControl, isNumberControl, or, RankedTester, rankWith, StatePropsOfControl } from '@jsonforms/core';

@Component({
  selector: 'NumberControlRenderer',
  template: `
    <nz-form-item [class]="additionalClasses">
      <nz-form-label *ngIf="label && label !== '*'" [nzFor]="id"
        ><i *ngIf="labelIcon" nz-icon [nzType]="labelIcon" nzTheme="outline"></i> {{ label }}</nz-form-label
      >
      <div class="description">{{ description }}</div>
      <nz-form-control nzHasFeedback [nzErrorTip]="errorMessage" [nzValidateStatus]="form.status | nzValidationStatus">
        <nz-input-number
          [id]="id"
          [formControl]="form"
          [nzMin]="min"
          [nzMax]="max"
          [nzStep]="stepper"
          [nzPlaceHolder]="placeholder || ''"
          [nzDisabled]="!isEnabled()"
          (ngModelChange)="onChange($event)"
          (blur)="triggerValidation()"
        ></nz-input-number>
      </nz-form-control>
    </nz-form-item>
  `,
  styles: [
    `
      nz-form-item {
        display: block;
      }

      .description {
        font-size: 0.75em;
        margin: 0.25em 0 0.5em;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => ev));
      this.triggerValidation();
    }
  }

  override mapAdditionalProps(props: StatePropsOfControl) {
    if (this.scopedSchema) {
      const defaultStep = isNumberControl(this.uischema, this.rootSchema, this.rootSchema) ? 0.1 : 1;
      this.min = this.scopedSchema.minimum;
      this.max = this.scopedSchema.maximum;
      this.stepper = this.scopedSchema.multipleOf || defaultStep;
    }
  }
}

export const NumberControlRendererTester: RankedTester = rankWith(2, or(isNumberControl, isIntegerControl));
