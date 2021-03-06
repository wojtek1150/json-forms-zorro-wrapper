import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Actions, isDateControl, RankedTester, rankWith } from '@jsonforms/core';
import { JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'DateControlRenderer',
  template: `
    <nz-form-item [class]="additionalClasses">
      <nz-form-label *ngIf="label" [nzFor]="id"><i *ngIf="labelIcon" nz-icon [nzType]="labelIcon" nzTheme="outline"></i> {{ label }}</nz-form-label>
      <div class="description">{{ description }}</div>
      <nz-form-control nzHasFeedback [nzErrorTip]="errorMessage" [nzValidateStatus]="form.status | nzValidationStatus">
        <nz-date-picker
          [id]="id"
          [formControl]="form"
          [nzFormat]="dateFormat"
          [nzDisabled]="!isEnabled()"
          (ngModelChange)="onChange($event)"
        ></nz-date-picker>
      </nz-form-control>
    </nz-form-item>
  `,
  styles: [
    `
      nz-date-picker {
        width: 100%;
      }
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
export class DateControlRenderer extends JsonFormsControl {
  readonly dateFormat = 'yyyy-MM-dd';
  selectedDate: string = null;

  constructor(jsonformsService: JsonFormsAngularService, private datePipe: DatePipe) {
    super(jsonformsService);
  }

  override getEventValue = (event: string) => event;

  override onChange(ev: any) {
    const formattedDate = this.datePipe.transform(ev, this.dateFormat);
    if (this.selectedDate !== formattedDate) {
      this.selectedDate = formattedDate;
      this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => formattedDate));
      this.triggerValidation();
    }
  }
}

export const DateControlRendererTester: RankedTester = rankWith(2, isDateControl);
