import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { isBooleanControl, RankedTester, rankWith } from '@jsonforms/core';

@Component({
  selector: 'BooleanControlRenderer',
  template: `
    <nz-form-item *ngIf="!hidden" [class]="additionalClasses">
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
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooleanControlRenderer extends JsonFormsControl {
  constructor(jsonformsService: JsonFormsAngularService, changeDetectorRef: ChangeDetectorRef) {
    super(jsonformsService, changeDetectorRef);
  }

  override getEventValue = (event: string) => event;
}

export const BooleanControlTester: RankedTester = rankWith(2, isBooleanControl);
