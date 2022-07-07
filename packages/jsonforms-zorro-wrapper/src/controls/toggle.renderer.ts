import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { Actions, and, isBooleanControl, optionIs, RankedTester, rankWith } from '@jsonforms/core';

@Component({
  selector: 'ToggleControlRenderer',
  template: `
    <label class="switch">
      <nz-switch
        [id]="id"
        [formControl]="form"
        [nzDisabled]="!isEnabled()"
        (ngModelChange)="onChange($event)"
      ></nz-switch>
      <span *ngIf="label">{{label}}</span>
    </label>
  `,
  styles: [`
    .switch {
      align-items: center;
      cursor: pointer;
      display: flex;
    }
    .switch span {
      padding-left: 8px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToggleControlRenderer extends JsonFormsControl {
  private selectedState: boolean = false;

  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
  }

  override getEventValue = (event: any) => event;

  override onChange(state: boolean) {
    if (this.selectedState !== state) {
      this.selectedState = state;
      this.jsonFormsService.updateCore(
        Actions.update(this.propsPath, () => state)
      );
      this.triggerValidation();
    }
  }
}

export const ToggleControlRendererTester: RankedTester = rankWith(
  3,
  and(isBooleanControl, optionIs('toggle', true))
);
