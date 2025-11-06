import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { DescriptionRenderer, JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { Actions, isEnumControl, isOneOfControl, or, RankedTester, rankWith, StatePropsOfControl } from '../core';
import { NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NzValidationStatusPipe } from '../other/validation-status.pipe';

@Component({
  selector: 'SelectControlRenderer',
  template: `
    @if (scopedSchema) {
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
          <nz-select
            [nzShowSearch]="true"
            [nzAllowClear]="true"
            [id]="id"
            [formControl]="form"
            [nzPlaceHolder]="placeholder"
            (ngModelChange)="onChange($event)"
            (blur)="triggerValidation()"
          >
            @for (option of options; track option) {
              <nz-option [nzLabel]="option.label" [nzValue]="option.value"></nz-option>
            }
          </nz-select>
        </nz-form-control>
      </nz-form-item>
    }
  `,
  styles: [
    `
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
    NzSelectComponent,
    ReactiveFormsModule,
    NzOptionComponent,
    NzValidationStatusPipe,
  ],
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
