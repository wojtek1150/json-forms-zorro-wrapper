import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { Actions, and, isBooleanControl, optionIs, RankedTester, rankWith } from '../core';

@Component({
  selector: 'ToggleControlRenderer',
  template: `
    <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="scopedSchema"></DescriptionRenderer>
    <label class="switch" [class]="additionalClasses">
      <nz-switch [id]="id" [formControl]="form" [nzDisabled]="!isEnabled" (ngModelChange)="onChange($event)"></nz-switch>
      <span *ngIf="label">{{ label }}</span>
    </label>
  `,
  styles: [
    `
      .switch {
        align-items: center;
        cursor: pointer;
        display: flex;
      }

      .switch span {
        padding-left: 8px;
      }

      .hidden {
        display: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleControlRenderer extends JsonFormsControl {
  private selectedState: boolean = false;

  constructor(jsonformsService: JsonFormsAngularService, changeDetectorRef: ChangeDetectorRef) {
    super(jsonformsService, changeDetectorRef);
  }

  override getEventValue = (event: any) => event;

  override onChange(state: boolean) {
    if (this.selectedState !== state) {
      this.selectedState = state;
      this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => state));
      this.triggerValidation();
    }
  }
}

export const ToggleControlRendererTester: RankedTester = rankWith(3, and(isBooleanControl, optionIs('toggle', true)));
