import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { isStringControl, RankedTester, rankWith } from '@jsonforms/core';

@Component({
  selector: 'TextControlRenderer',
  template: `
    <nz-form-item>
      <nz-form-label *ngIf="shouldShowUnfocusedDescription()" [nzFor]="id">{{description}}</nz-form-label>
      <nz-form-control nzHasFeedback [nzErrorTip]="error" [nzValidateStatus]="form.status | nzValidationStatus">
        <input
          nz-input
          [id]="id"
          [formControl]="form"
          [placeholder]="label"
          [type]="type"
          (input)="onChange($event)"
        >
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextControlRenderer extends JsonFormsControl {
  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
  }

  override getEventValue = (event: any) => event.target.value;

  get type(): string {
    if (this.uischema.options && this.uischema.options['format']) {
      return this.uischema.options['format'];
    }
    if (this.scopedSchema && this.scopedSchema.format) {
      switch (this.scopedSchema.format) {
        case 'email':
          return 'email';
        case 'tel':
          return 'tel';
        default:
          return 'text';
      }
    }
    return 'text';
  };
}

export const TextControlRendererTester: RankedTester = rankWith(
  1,
  isStringControl
);
