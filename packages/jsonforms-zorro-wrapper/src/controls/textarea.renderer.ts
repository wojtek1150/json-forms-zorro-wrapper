import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { isMultiLineControl, RankedTester, rankWith } from '@jsonforms/core';
import { AutoSizeType } from 'ng-zorro-antd/input/autosize.directive';

@Component({
  selector: 'TextAreaRenderer',
  template: `
    <nz-form-item [class]="additionalClasses" [class.hidden]="hidden">
      <nz-form-label *ngIf="label && label !== '*'" [nzFor]="id" [nzRequired]="required" [nzNoColon]="hideColonInLabel"
        ><i *ngIf="labelIcon" nz-icon [nzType]="labelIcon" nzTheme="outline"></i> {{ label }}</nz-form-label
      >
      <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="scopedSchema"></DescriptionRenderer>
      <nz-form-control [nzHasFeedback]="showValidationStatus" [nzErrorTip]="errorMessage" [nzValidateStatus]="form.status | nzValidationStatus">
        <textarea
          nz-input
          [id]="id"
          [formControl]="form"
          [placeholder]="placeholder"
          [nzAutosize]="autosize"
          (input)="onChange($event)"
          (blur)="triggerValidation()"
        ></textarea>
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
})
export class TextAreaRenderer extends JsonFormsControl {
  autosize: string | boolean | AutoSizeType;

  constructor(jsonformsService: JsonFormsAngularService, changeDetectorRef: ChangeDetectorRef) {
    super(jsonformsService, changeDetectorRef);
  }

  override getEventValue = (event: any) => event.target.value || undefined;

  override mapAdditionalProps(props) {
    super.mapAdditionalProps(props);
    if (this.uischema) {
      const rows = {
        minRows: this.uischema.options['minRows'],
        maxRows: this.uischema.options['maxRows'],
      };
      this.autosize = this.uischema.options['minRows'] || this.uischema.options['maxRows'] ? rows : true;
    }
  }
}

export const TextAreaRendererTester: RankedTester = rankWith(2, isMultiLineControl);
