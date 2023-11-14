import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Actions, and, optionIs, RankedTester, rankWith, schemaTypeIs } from '../core';
import { JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'DateRangeControlRenderer',
  template: `
    <nz-form-item [class]="additionalClasses" [class.hidden]="hidden">
      <nz-form-label *ngIf="label && label !== '*'" [nzFor]="id" [nzRequired]="required" [nzNoColon]="hideColonInLabel"
        ><i *ngIf="labelIcon" nz-icon [nzType]="labelIcon" nzTheme="outline"></i> {{ label }}</nz-form-label
      >
      <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="scopedSchema"></DescriptionRenderer>
      <nz-form-control [nzHasFeedback]="showValidationStatus" [nzErrorTip]="errorMessage" [nzValidateStatus]="form.status | nzValidationStatus">
        <nz-range-picker
          [id]="id"
          [formControl]="form"
          [nzFormat]="dateFormat"
          [nzShowTime]="showTime"
          [nzDisabled]="!isEnabled"
          (ngModelChange)="onChange($event)"
        ></nz-range-picker>
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
export class DateRangeControlRenderer extends JsonFormsControl {
  dateFormat: string = 'yyyy-MM-dd';
  showTime: boolean = false;
  selectedDate: [string?, string?] = [];

  constructor(
    jsonformsService: JsonFormsAngularService,
    changeDetectorRef: ChangeDetectorRef,
    private datePipe: DatePipe,
  ) {
    super(jsonformsService, changeDetectorRef);
  }

  override getEventValue = (event: any) => {
    console.log(event);
    return event;
  };

  override mapAdditionalProps(props): void {
    super.mapAdditionalProps(props);
    if (this.scopedSchema) {
      this.dateFormat = this.uischema.options?.dateFormat || 'yyyy-MM-dd';
      this.showTime = this.uischema.options?.showTime || false;
    }
  }

  override onChange(ev: any) {
    const formattedDates: [string, string] = [this.datePipe.transform(ev[0], this.dateFormat), this.datePipe.transform(ev[1], this.dateFormat)];
    if (this.selectedDate !== formattedDates) {
      this.selectedDate = formattedDates;
      this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => ev));
      this.triggerValidation();
    }
  }
}

export const DateRangeControlRendererTester: RankedTester = rankWith(2, and(optionIs('format', 'dateRange'), schemaTypeIs('array')));
