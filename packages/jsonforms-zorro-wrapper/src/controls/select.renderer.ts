import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { Actions, isEnumControl, RankedTester, rankWith } from '@jsonforms/core';

@Component({
  selector: 'SelectControlRenderer',
  template: `
    <nz-form-item *ngIf="scopedSchema">
      <nz-form-label *ngIf="description" [nzFor]="id">{{description}}</nz-form-label>
      <nz-form-control nzHasFeedback [nzErrorTip]="error" [nzValidateStatus]="form.status | nzValidationStatus">
        <nz-select
          nzShowSearch
          nzAllowClear
          [id]="id"
          [formControl]="form"
          [nzPlaceHolder]="label"
          (ngModelChange)="onChange($event)"
        >
          <nz-option *ngFor="let option of scopedSchema.enum" [nzLabel]="option" [nzValue]="option"></nz-option>
        </nz-select>
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectControlRenderer extends JsonFormsControl {
  private selectedValue: string;

  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
  }

  override getEventValue = (event: any) => event;


  override onChange(event: string) {
    if (this.selectedValue !== event) {
      this.selectedValue = event;
      this.jsonFormsService.updateCore(
        Actions.update(this.propsPath, () => event)
      );
      this.triggerValidation();
    }
  }

}

export const SelectControlTester: RankedTester = rankWith(2, isEnumControl);
