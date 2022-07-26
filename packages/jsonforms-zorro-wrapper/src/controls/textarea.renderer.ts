import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { isMultiLineControl, RankedTester, rankWith } from '@jsonforms/core';
import { AutoSizeType } from 'ng-zorro-antd/input/autosize.directive';

@Component({
  selector: 'TextAreaRenderer',
  template: `
    <nz-form-item [class]="additionalClasses">
      <nz-form-label *ngIf="label" [nzFor]="id"><i *ngIf="labelIcon" nz-icon [nzType]="labelIcon" nzTheme="outline"></i> {{ label }}</nz-form-label>
      <div class="description">{{ uischema['description'] }}</div>
      <nz-form-control nzHasFeedback [nzErrorTip]="error" [nzValidateStatus]="form.status | nzValidationStatus">
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
      .description {
        font-size: 0.75em;
        margin: 0.25em 0 0.5em;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAreaRenderer extends JsonFormsControl {
  autosize: string | boolean | AutoSizeType;

  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
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
