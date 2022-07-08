import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { Actions, and, isEnumControl, optionIs, RankedTester, rankWith } from '@jsonforms/core';

@Component({
  selector: 'RadioControlRenderer',
  template: `
    <nz-form-item *ngIf="scopedSchema" [class]="'formItem' + id">
      <nz-form-label *ngIf="description" [nzFor]="id">{{ description }}</nz-form-label>
      <nz-form-control nzHasFeedback [nzErrorTip]="error" [nzValidateStatus]="form.status | nzValidationStatus">
        <nz-radio-group [id]="id" [formControl]="form" (ngModelChange)="onChange($event)">
          <label nz-radio-button *ngFor="let option of scopedSchema.enum" [nzValue]="option">{{ option }}</label>
        </nz-radio-group>
      </nz-form-control>
    </nz-form-item>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioButtonControlRenderer extends JsonFormsControl {
  private selectedValue: string;

  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
  }

  override getEventValue = (event: any) => event;

  override onChange(event: string) {
    if (this.selectedValue !== event) {
      this.selectedValue = event;
      this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => event));
      this.triggerValidation();
    }
  }
}

export const RadioButtonControlRendererTester: RankedTester = rankWith(20, and(isEnumControl, optionIs('format', 'radio-button')));
