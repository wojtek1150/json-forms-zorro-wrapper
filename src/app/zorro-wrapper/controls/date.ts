import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Actions, isDateControl, RankedTester, rankWith } from '@jsonforms/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'DateControlRenderer',
  template: `
    <nz-form-item>
      <nz-form-label *ngIf="shouldShowUnfocusedDescription()" [nzFor]="id">{{description}}</nz-form-label>
      <nz-form-control nzHasFeedback [nzErrorTip]="error" [nzValidateStatus]="form.status | nzValidationStatus">
        <nz-date-picker
          [id]="id"
          [formControl]="form"
          [nzFormat]="dateFormat"
          (ngModelChange)="onChange($event)"
        ></nz-date-picker>
      </nz-form-control>
    </nz-form-item>
  `,
  styles: [`
    nz-date-picker {
      width: 100%;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DateControlRenderer extends JsonFormsControl {
  readonly dateFormat = 'yyyy-MM-dd';
  selectedDate: string = null;

  constructor(
    jsonformsService: JsonFormsAngularService,
    private datePipe: DatePipe,
  ) {
    super(jsonformsService);
  }

  override getEventValue = (event: string) => event;

  override onChange(ev: any) {
    const formattedDate = this.datePipe.transform(ev, this.dateFormat);
    if (this.selectedDate !== formattedDate) {
      this.selectedDate = formattedDate;
      this.jsonFormsService.updateCore(
        Actions.update(this.propsPath, () => formattedDate)
      );
      this.triggerValidation();
    }
  }
}

export const DateControlRendererTester: RankedTester = rankWith(
  2,
  isDateControl
);