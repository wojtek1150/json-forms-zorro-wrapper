import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Actions, and, optionIs, RankedTester, rankWith, schemaTypeIs } from '../core';
import { DescriptionRenderer, JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { differenceInCalendarDays, format, isSameDay, parse, parseISO } from 'date-fns';
import { NzDatePickerComponent, NzRangePickerComponent, SupportTimeOptions } from 'ng-zorro-antd/date-picker';
import { NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { NzValidationStatusPipe } from '../other/validation-status.pipe';

type DateRange = [Date | string, Date | string] | null;

@Component({
  selector: 'DateRangeControlRenderer',
  template: `
    <nz-form-item [class]="additionalClasses" [class.hidden]="hidden">
      @if (label && label !== '*') {
        <nz-form-label [nzFor]="id" [nzRequired]="required" [nzNoColon]="hideColonInLabel">
          @if (labelIcon) {
            <nz-icon [nzType]="labelIcon" nzTheme="outline" />
          }
          {{ label }}
        </nz-form-label>
      }
      <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="scopedSchema"></DescriptionRenderer>
      <nz-form-control
        [nzHasFeedback]="showValidationStatus"
        [nzErrorTip]="errorMessage"
        [nzWarningTip]="warningHint()"
        [nzValidateStatus]="errorStatus | nzValidationStatus"
      >
        <nz-range-picker
          [id]="id"
          [formControl]="form"
          [nzFormat]="dateFormat"
          [nzShowTime]="showTime"
          [nzDisabled]="!isEnabled"
          [nzDisabledDate]="disabledDate"
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
  imports: [
    NzFormItemComponent,
    NzFormLabelComponent,
    NzIconDirective,
    DescriptionRenderer,
    NzFormControlComponent,
    NzRangePickerComponent,
    ReactiveFormsModule,
    NzValidationStatusPipe,
    NzDatePickerComponent,
  ],
})
export class DateRangeControlRenderer extends JsonFormsControl {
  dateFormat: string = 'yyyy-MM-dd';
  saveFormat: string | null = null;
  showTime: boolean | SupportTimeOptions = false;
  selectedDates: DateRange = null;

  disabledDate: (current: Date) => boolean;

  constructor(jsonformsService: JsonFormsAngularService, changeDetectorRef: ChangeDetectorRef) {
    super(jsonformsService, changeDetectorRef);
  }

  override getEventValue = (event: any) => event;

  override setFormValue(value: any) {
    if (!value) {
      this.form.setValue(value);
    } else {
      const parsedDates = this.saveFormat
        ? [parse(value[0], this.saveFormat, new Date()), parse(value[1], this.saveFormat, new Date())]
        : [parseISO(value[0]), parseISO(value[1])];
      this.form.setValue(parsedDates, { emitEvent: false });
    }
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

  override onChange(ev: any) {
    const formattedDates: DateRange =
      !ev || !ev[0]
        ? null
        : this.saveFormat
          ? [format(ev[0], this.saveFormat), format(ev[1], this.saveFormat)]
          : [ev[0].toISOString(), ev[1].toISOString()];

    if (!this.isRangeEqual(this.selectedDates, formattedDates)) {
      this.selectedDates = formattedDates;
      this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => formattedDates));
      this.triggerValidation();
    }
  }

  private setDisabledDate(): void {
    if (this.uischema.options?.disablePastDates) {
      this.disabledDate = (current: Date) =>
        differenceInCalendarDays(current, new Date()) < 0 &&
        (!this.data ||
          ((!this.data[0] || !isSameDay(new Date(this.data[0]), current)) && (!this.data[1] || !isSameDay(new Date(this.data[1]), current))));
    }
  }

  private isRangeEqual(a: DateRange, b: DateRange): boolean {
    if (!a && !b) {
      return true;
    }
    if (!a || !b) {
      return false;
    }

    return a[0] === b[0] && b[1] === b[1];
  }
}

export const DateRangeControlRendererTester: RankedTester = rankWith(2, and(optionIs('format', 'dateRange'), schemaTypeIs('array')));
