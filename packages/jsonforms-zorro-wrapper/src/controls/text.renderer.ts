import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { isStringControl, RankedTester, rankWith } from '@jsonforms/core';

@Component({
  selector: 'TextControlRenderer',
  template: `
    <nz-form-item *ngIf="!hidden" [class]="additionalClasses">
      <nz-form-label *ngIf="label && label !== '*'" [nzFor]="id" [nzRequired]="required" [nzNoColon]="hideColonInLabel"
        ><i *ngIf="labelIcon" nz-icon [nzType]="labelIcon" nzTheme="outline"></i> {{ label }}</nz-form-label
      >
      <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="scopedSchema"></DescriptionRenderer>
      <nz-form-control [nzHasFeedback]="showValidationStatus" [nzErrorTip]="errorMessage" [nzValidateStatus]="form.status | nzValidationStatus">
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
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextControlRenderer extends JsonFormsControl {
  constructor(jsonformsService: JsonFormsAngularService, changeDetectorRef: ChangeDetectorRef) {
    super(jsonformsService, changeDetectorRef);
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
