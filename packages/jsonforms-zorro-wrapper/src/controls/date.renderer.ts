import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Actions, isDateControl, RankedTester, rankWith } from '../core';
import { JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'DateControlRenderer',
  template: `
    <nz-form-item [class]="additionalClasses" [class.hidden]="hidden">
      <nz-form-label *ngIf="label && label !== '*'" [nzFor]="id" [nzRequired]="required" [nzNoColon]="hideColonInLabel"
        ><i *ngIf="labelIcon" nz-icon [nzType]="labelIcon" nzTheme="outline"></i> {{ label }}</nz-form-label
      >
      <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="scopedSchema"></DescriptionRenderer>
      <nz-form-control [nzHasFeedback]="showValidationStatus" [nzErrorTip]="errorMessage" [nzValidateStatus]="form.status | nzValidationStatus">
        <nz-date-picker
          [id]="id"
          [formControl]="form"
          [nzFormat]="dateFormat"
          [nzShowTime]="showTime"
          [nzDisabled]="!isEnabled"
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
  selectedDate: string = null;

  constructor(
    jsonformsService: JsonFormsAngularService,
    changeDetectorRef: ChangeDetectorRef,
    private datePipe: DatePipe,
  ) {
    super(jsonformsService, changeDetectorRef);
  }

  override getEventValue = (ev: string) => this.datePipe.transform(ev, this.dateFormat);

  override setFormValue(value: any) {
    super.setFormValue(value ? new Date(value) : value);
  }

  override mapAdditionalProps(props): void {
    super.mapAdditionalProps(props);
    if (this.scopedSchema) {
      this.dateFormat = this.uischema.options?.dateFormat || 'yyyy-MM-dd';
      this.saveFormat = this.uischema.options?.saveFormat;
      this.showTime = this.uischema.options?.showTime || false;
    }
  }

  override onChange(ev: null | Date) {
    const formattedDate = !ev ? (ev as null) : this.saveFormat ? this.datePipe.transform(ev, this.saveFormat) : ev.toISOString();
    if (this.selectedDate !== formattedDate) {
      this.selectedDate = formattedDate;
      this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => formattedDate));
      this.triggerValidation();
    }
  }
}

export const DateControlRendererTester: RankedTester = rankWith(2, isDateControl);
