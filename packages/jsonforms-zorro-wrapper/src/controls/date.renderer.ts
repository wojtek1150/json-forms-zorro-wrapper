import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { Actions, isDateControl, RankedTester, rankWith } from '../core';
import { DescriptionRenderer, JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { differenceInCalendarDays, format, parse, parseISO } from 'date-fns';
import { DisabledTimeConfig, DisabledTimeFn, NzDatePickerComponent, SupportTimeOptions } from 'ng-zorro-antd/date-picker';
import { NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { NzValidationStatusPipe } from '../other/validation-status.pipe';
import { DateControlUISchemaOptions } from '../models/controls/date-renderer.model';

@Component({
  selector: 'DateControlRenderer',
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
        <nz-date-picker
          [id]="id"
          [formControl]="form"
          [nzFormat]="dateFormat"
          [nzShowTime]="showTime"
          [nzDisabled]="!isEnabled"
          [nzDisabledDate]="disabledDate"
          [nzDisabledTime]="disabledTime"
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
  imports: [
    NzFormItemComponent,
    NzFormLabelComponent,
    NzIconDirective,
    DescriptionRenderer,
    NzFormControlComponent,
    NzDatePickerComponent,
    ReactiveFormsModule,
    NzValidationStatusPipe,
  ],
})
export class DateControlRenderer extends JsonFormsControl<DateControlUISchemaOptions> {
  dateFormat: string = 'yyyy-MM-dd';
  saveFormat: string | null = null;
  showTime: boolean | SupportTimeOptions = false;
  selectedDate: string | Date = null;

  disabledDate: (current: Date) => boolean;
  disabledTime: DisabledTimeFn | undefined;

  constructor(jsonformsService: JsonFormsAngularService, changeDetectorRef: ChangeDetectorRef) {
    super(jsonformsService, changeDetectorRef);
  }

  override setFormValue(value: any) {
    if (!value) {
      this.form.setValue(value);
    } else {
      this.form.setValue(this.saveFormat ? parse(value, this.saveFormat, new Date()) : parseISO(value));
    }
  }

  override mapAdditionalProps(props): void {
    super.mapAdditionalProps(props);
    if (this.scopedSchema) {
      this.dateFormat = this.uischema.options?.dateFormat || 'yyyy-MM-dd';
      this.saveFormat = this.uischema.options?.saveFormat;
      this.showTime = this.uischema.options?.showTime || false;
      this.setDisabledDate();
      this.setDisabledTime();
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
    const options = this.uischema.options || {};
    const disabledDateFnKey = options.disabledDateFnKey;
    const minDate = options.minDate ? new Date(options.minDate) : null;
    const maxDate = options.maxDate ? new Date(options.maxDate) : null;

    if (disabledDateFnKey && this.config.disabledDateFn?.[disabledDateFnKey]) {
      this.disabledDate = this.config.disabledDateFn[disabledDateFnKey];
    } else {
      this.disabledDate = (current: Date) => {
        let disable = false;

        if (options.disablePastDates) {
          disable = disable || differenceInCalendarDays(current, new Date()) < 0;
        }

        // Handle minDate (inclusive)
        if (minDate) {
          disable = disable || differenceInCalendarDays(current, minDate) < 0;
        }

        // Handle maxDate (inclusive)
        if (maxDate) {
          disable = disable || differenceInCalendarDays(current, maxDate) > 0;
        }

        return disable;
      };
    }
  }

  private setDisabledTime(): void {
    const options = this.uischema.options || {};
    const disabledTimeFnKey = options.disabledTimeFnKey;
    const minDate = options.minDate ? new Date(options.minDate) : null;
    const maxDate = options.maxDate ? new Date(options.maxDate) : null;

    if (disabledTimeFnKey && this.config.disabledTimeFn?.[disabledTimeFnKey]) {
      this.disabledTime = this.config.disabledTimeFn[disabledTimeFnKey];
      return;
    }

    if (!this.showTime || (!minDate && !maxDate)) {
      this.disabledTime = undefined;
      return;
    }

    const isSameDay = (dateA: Date, dateB: Date) => differenceInCalendarDays(dateA, dateB) === 0;

    const createDisabledUnits = (current: Date): DisabledTimeConfig | undefined => {
      if (!current) {
        return undefined;
      }

      const disabledHours = () => {
        const hours: number[] = [];

        if (minDate && isSameDay(current, minDate)) {
          for (let h = 0; h < minDate.getHours(); h++) {
            hours.push(h);
          }
        }

        if (maxDate && isSameDay(current, maxDate)) {
          for (let h = maxDate.getHours() + 1; h < 24; h++) {
            hours.push(h);
          }
        }

        return hours;
      };

      const disabledMinutes = (hour: number) => {
        const minutes: number[] = [];

        if (minDate && isSameDay(current, minDate) && hour === minDate.getHours()) {
          for (let m = 0; m < minDate.getMinutes(); m++) {
            minutes.push(m);
          }
        }

        if (maxDate && isSameDay(current, maxDate) && hour === maxDate.getHours()) {
          for (let m = maxDate.getMinutes() + 1; m < 60; m++) {
            minutes.push(m);
          }
        }

        return minutes;
      };

      const disabledSeconds = (hour: number, minute: number) => {
        const seconds: number[] = [];

        if (
          minDate &&
          isSameDay(current, minDate) &&
          hour === minDate.getHours() &&
          minute === minDate.getMinutes()
        ) {
          for (let s = 0; s < minDate.getSeconds(); s++) {
            seconds.push(s);
          }
        }

        if (
          maxDate &&
          isSameDay(current, maxDate) &&
          hour === maxDate.getHours() &&
          minute === maxDate.getMinutes()
        ) {
          for (let s = maxDate.getSeconds() + 1; s < 60; s++) {
            seconds.push(s);
          }
        }

        return seconds;
      };

      return {
        nzDisabledHours: disabledHours,
        nzDisabledMinutes: disabledMinutes,
        nzDisabledSeconds: disabledSeconds,
      };
    };

    this.disabledTime = (current: Date) => createDisabledUnits(current);
  }
}

export const DateControlRendererTester: RankedTester = rankWith(2, isDateControl);
