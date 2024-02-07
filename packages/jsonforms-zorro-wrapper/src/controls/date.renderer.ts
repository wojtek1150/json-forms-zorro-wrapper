import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Actions, isDateControl, RankedTester, rankWith } from '../core';
import { JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { differenceInCalendarDays, format, parse, parseISO } from 'date-fns';

@Component({
  selector: 'DateControlRenderer',
  template: `
    <nz-form-item [class]="additionalClasses" [class.hidden]="hidden">
      <nz-form-label *ngIf="label && label !== '*'" [nzFor]="id" [nzRequired]="required" [nzNoColon]="hideColonInLabel"
        ><i *ngIf="labelIcon" nz-icon [nzType]="labelIcon" nzTheme="outline"></i> {{ label }}
      </nz-form-label>
      <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="scopedSchema"></DescriptionRenderer>
      <nz-form-control [nzHasFeedback]="showValidationStatus" [nzErrorTip]="errorMessage" [nzValidateStatus]="form.status | nzValidationStatus">
        <nz-date-picker
          [id]="id"
          [formControl]="form"
          [nzFormat]="dateFormat"
          [nzShowTime]="showTime"
          [nzDisabled]="!isEnabled"
          [nzDisabledDate]="disabledDate"
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

      .hidden {
        display: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateControlRenderer extends JsonFormsControl {
  dateFormat: string = 'yyyy-MM-dd';
  saveFormat: string | null = null;
  showTime: boolean = false;
  selectedDate: string | Date = null;

  disabledDate: (current: Date) => boolean;

  constructor(jsonformsService: JsonFormsAngularService, changeDetectorRef: ChangeDetectorRef) {
    super(jsonformsService, changeDetectorRef);
  }

  override setFormValue(value: any) {
    const parsed = this.saveFormat ? parse(value, this.saveFormat, new Date()) : parseISO(value);
    this.form.setValue(value ? parsed : value);
  }

  override mapAdditionalProps(props): void {
    super.mapAdditionalProps(props);
    if (this.scopedSchema) {
      this.dateFormat = this.uischema.options?.dateFormat || 'yyyy-MM-dd';
      this.saveFormat = this.uischema.options?.saveFormat;
      this.showTime = this.uischema.options?.showTime || false;
      this.setDisabledDate();
    }
  }

  override onChange(ev: null | Date) {
    const formattedDate = !ev ? null : this.saveFormat ? format(ev, this.saveFormat) : ev.toISOString();
    if (this.selectedDate !== formattedDate) {
      this.selectedDate = formattedDate;
      this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => formattedDate));
      this.triggerValidation();
    }
  }

  private setDisabledDate(): void {
    const disabledDateFnKey = this.uischema.options?.disabledDateFnKey;

    if (disabledDateFnKey) {
      this.disabledDate = this.config.disabledDateFn[disabledDateFnKey];
    } else if (this.uischema.options?.disablePastDates) {
      this.disabledDate = (current: Date) => differenceInCalendarDays(current, new Date()) < 0;
    }
  }
}

export const DateControlRendererTester: RankedTester = rankWith(2, isDateControl);
