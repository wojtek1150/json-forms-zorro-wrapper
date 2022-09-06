import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { isStringControl, RankedTester, rankWith } from '@jsonforms/core';

@Component({
  selector: 'TextControlRenderer',
  template: `
    <nz-form-item [class]="additionalClasses">
      <nz-form-label *ngIf="label && label !== '*'" [nzFor]="id"
        ><i *ngIf="labelIcon" nz-icon [nzType]="labelIcon" nzTheme="outline"></i> {{ label }}</nz-form-label
      >
      <div class="description">{{ description }}</div>
      <nz-form-control nzHasFeedback [nzErrorTip]="errorMessage" [nzValidateStatus]="form.status | nzValidationStatus">
        <input
          nz-input
          [id]="id"
          [formControl]="form"
          [placeholder]="placeholder"
          [type]="type"
          (input)="onChange($event)"
          (blur)="triggerValidation()"
        />
      </nz-form-control>
    </nz-form-item>
  `,
  styles: [
    `
      nz-form-item {
        display: block;
      }

      .description {
        font-size: 0.75em;
        margin: 0.25em 0 0.5em;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextControlRenderer extends JsonFormsControl {
  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
  }

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
  }

  override getEventValue = (event: any) => event.target.value || undefined;
}

export const TextControlRendererTester: RankedTester = rankWith(1, isStringControl);
