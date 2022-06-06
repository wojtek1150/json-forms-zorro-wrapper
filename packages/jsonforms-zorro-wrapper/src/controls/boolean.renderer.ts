import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { isBooleanControl, RankedTester, rankWith } from '@jsonforms/core';

@Component({
  selector: 'BooleanControlRenderer',
  template: `
    <nz-form-item>
      <nz-form-control [nzErrorTip]="error" [nzValidateStatus]="form.status | nzValidationStatus">
        <label
          nz-checkbox
          [id]="id"
          [formControl]="form"
          (nzCheckedChange)="onChange($event)"
        >
          <span>{{label}}</span>
        </label>
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BooleanControlRenderer extends JsonFormsControl {
  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
  }

  override getEventValue = (event: string) => event;
}

export const BooleanControlTester: RankedTester = rankWith(2, isBooleanControl);
