import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { isMultiLineControl, RankedTester, rankWith } from '@jsonforms/core';
import { AutoSizeType } from 'ng-zorro-antd/input/autosize.directive';

@Component({
  selector: 'TextAreaRenderer',
  template: `
    <nz-form-item>
      <nz-form-label *ngIf="description" [nzFor]="id">{{description}}</nz-form-label>
      <nz-form-control nzHasFeedback [nzErrorTip]="error" [nzValidateStatus]="form.status | nzValidationStatus">
        <textarea
          nz-input
          [id]="id"
          [formControl]="form"
          [placeholder]="label"
          [nzAutosize]="autosize"
          (input)="onChange($event)"
        ></textarea>
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextAreaRenderer extends JsonFormsControl {
  autosize: string | boolean | AutoSizeType;

  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
  }

  override getEventValue = (event: any) => event.target.value;

  override mapAdditionalProps() {
    if (this.uischema) {
      const rows = {
        minRows: this.uischema.options['minRows'],
        maxRows: this.uischema.options['maxRows'],
      };
      this.autosize = this.uischema.options['minRows'] || this.uischema.options['maxRows'] ? rows : true;
    }
  }
}

export const TextAreaRendererTester: RankedTester = rankWith(
  2,
  isMultiLineControl
);
