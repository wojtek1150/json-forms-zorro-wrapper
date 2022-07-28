import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { Actions, isEnumControl, RankedTester, rankWith } from '@jsonforms/core';

@Component({
  selector: 'SelectControlRenderer',
  template: `
    <nz-form-item *ngIf="scopedSchema" [class]="additionalClasses">
      <nz-form-label *ngIf="label" [nzFor]="id"><i *ngIf="labelIcon" nz-icon [nzType]="labelIcon" nzTheme="outline"></i> {{ label }}</nz-form-label>
      <div class="description">{{ uischema['description'] }}</div>
      <nz-form-control nzHasFeedback [nzErrorTip]="errorMessage" [nzValidateStatus]="form.status | nzValidationStatus">
        <nz-select
          nzShowSearch
          nzAllowClear
          [id]="id"
          [formControl]="form"
          [nzPlaceHolder]="placeholder"
          (ngModelChange)="onChange($event)"
          (blur)="triggerValidation()"
        >
          <nz-option *ngFor="let option of scopedSchema.enum" [nzLabel]="option" [nzValue]="option"></nz-option>
        </nz-select>
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
export class SelectControlRenderer extends JsonFormsControl {
  private selectedValue: string;

  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
  }

  override getEventValue = (event: any) => event || undefined;

  override onChange(event: string) {
    if (this.selectedValue !== event) {
      this.selectedValue = event;
      this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => event));
      this.triggerValidation();
    }
  }
}

export const SelectControlTester: RankedTester = rankWith(2, isEnumControl);
