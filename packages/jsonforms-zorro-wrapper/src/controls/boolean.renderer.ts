import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { DescriptionRenderer, JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { isBooleanControl, RankedTester, rankWith } from '../core';
import { NzFormControlComponent, NzFormItemComponent } from 'ng-zorro-antd/form';
import { NzCheckboxComponent } from 'ng-zorro-antd/checkbox';
import { NzValidationStatusPipe } from '../other/validation-status.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'BooleanControlRenderer',
  template: `
    <nz-form-item [class]="additionalClasses" [class.hidden]="hidden">
      <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="scopedSchema"></DescriptionRenderer>
      <nz-form-control [nzErrorTip]="errorMessage" [nzValidateStatus]="form.status | nzValidationStatus">
        <label nz-checkbox [id]="id" [formControl]="form" (nzCheckedChange)="onChange($event)">
          <span>{{ label }}</span>
        </label>
      </nz-form-control>
    </nz-form-item>
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
  imports: [NzFormItemComponent, DescriptionRenderer, NzFormControlComponent, NzCheckboxComponent, NzValidationStatusPipe, ReactiveFormsModule],
})
export class BooleanControlRenderer extends JsonFormsControl {
  constructor(jsonformsService: JsonFormsAngularService, changeDetectorRef: ChangeDetectorRef) {
    super(jsonformsService, changeDetectorRef);
  }

  override getEventValue = (event: string) => event;
}

export const BooleanControlTester: RankedTester = rankWith(2, isBooleanControl);
