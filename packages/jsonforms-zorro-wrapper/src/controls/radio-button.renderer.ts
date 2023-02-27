import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { Actions, and, isEnumControl, optionIs, RankedTester, rankWith } from '@jsonforms/core';

@Component({
  selector: 'RadioControlRenderer',
  template: `
    <nz-form-item *ngIf="!hidden && scopedSchema" [class]="additionalClasses">
      <nz-form-label *ngIf="label && label !== '*'" [nzFor]="id" [nzRequired]="required" [nzNoColon]="hideColonInLabel"
        ><i *ngIf="labelIcon" nz-icon [nzType]="labelIcon" nzTheme="outline"></i> {{ label }}</nz-form-label
      >
      <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="scopedSchema"></DescriptionRenderer>
      <nz-form-control [nzErrorTip]="errorMessage">
        <nz-radio-group [id]="id" [formControl]="form" (ngModelChange)="onChange($event)" nzButtonStyle="solid">
          <label nz-radio-button *ngFor="let option of scopedSchema.enum" [nzValue]="option">{{ option }}</label>
        </nz-radio-group>
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
export class RadioButtonControlRenderer extends JsonFormsControl {
  private selectedValue: string;

  constructor(jsonformsService: JsonFormsAngularService, changeDetectorRef: ChangeDetectorRef) {
    super(jsonformsService, changeDetectorRef);
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
