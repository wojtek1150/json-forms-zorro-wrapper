import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { Actions, isEnumControl, isOneOfControl, or, RankedTester, rankWith, StatePropsOfControl } from '@jsonforms/core';

@Component({
  selector: 'SelectControlRenderer',
  template: `
    <nz-form-item *ngIf="!hidden && scopedSchema" [class]="additionalClasses">
      <nz-form-label *ngIf="label && label !== '*'" [nzFor]="id" [nzRequired]="required" [nzNoColon]="hideColonInLabel"
        ><i *ngIf="labelIcon" nz-icon [nzType]="labelIcon" nzTheme="outline"></i> {{ label }}</nz-form-label
      >
      <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="scopedSchema"></DescriptionRenderer>
      <nz-form-control [nzHasFeedback]="showValidationStatus" [nzErrorTip]="errorMessage" [nzValidateStatus]="form.status | nzValidationStatus">
        <nz-select
          nzShowSearch
          nzAllowClear
          [id]="id"
          [formControl]="form"
          [nzPlaceHolder]="placeholder"
          (ngModelChange)="onChange($event)"
          (blur)="triggerValidation()"
        >
          <nz-option *ngFor="let option of options" [nzLabel]="option.label" [nzValue]="option.value"></nz-option>
        </nz-select>
      </nz-form-control>
    </nz-form-item>
  `,
  styles: [
    `
      nz-form-item {
        display: block;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectControlRenderer extends JsonFormsControl {
  options: {
    label: string;
    value: any;
  }[];
  private selectedValue: string;

  constructor(jsonformsService: JsonFormsAngularService, changeDetectorRef: ChangeDetectorRef) {
    super(jsonformsService, changeDetectorRef);
  }

  override getEventValue = (event: any) => event || undefined;

  override onChange(event: string) {
    if (this.selectedValue !== event) {
      this.selectedValue = event;
      this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => event));
      this.triggerValidation();
    }
  }

  override mapAdditionalProps(props: StatePropsOfControl) {
    super.mapAdditionalProps(props);
    if (this.scopedSchema.enum) {
      this.options = this.scopedSchema.enum.map(option => ({ label: option, value: option }));
    } else {
      this.options = this.scopedSchema.oneOf.map(option => ({ label: option.title, value: option.const }));
    }
  }
}

export const SelectControlTester: RankedTester = rankWith(2, or(isEnumControl, isOneOfControl));
