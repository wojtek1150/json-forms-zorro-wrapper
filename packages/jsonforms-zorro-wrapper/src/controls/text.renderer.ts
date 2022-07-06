import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '@jsonforms/angular';
import { isStringControl, RankedTester, rankWith } from '@jsonforms/core';
import { ZorroControlElement } from '../other/uischema';

@Component({
  selector: 'TextControlRenderer',
  template: `
    <nz-form-item>
      <nz-form-label *ngIf="label" [nzFor]="id">{{label}}</nz-form-label>
      <div class="description">{{description}}</div>
      <nz-form-control nzHasFeedback [nzErrorTip]="error" [nzValidateStatus]="form.status | nzValidationStatus">
        <input
          nz-input
          [id]="id"
          [formControl]="form"
          [placeholder]="placeholder"
          [type]="type"
          (input)="onChange($event)"
        >
      </nz-form-control>
    </nz-form-item>
  `,
  styles: [`
    nz-form-item {
      display: block;
    }

    .description {
      font-size: 0.75em;
      margin: 0.25em 0 0.5em;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextControlRenderer extends JsonFormsControl {
  placeholder: string = null;

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

  override mapAdditionalProps() {
    this.placeholder = (this.uischema as ZorroControlElement).placeholder ?? this.label;
  }
}

export const TextControlRendererTester: RankedTester = rankWith(
  1,
  isStringControl
);
