import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { DescriptionRenderer, JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { Actions, and, isEnumControl, optionIs, RankedTester, rankWith } from '../core';
import { NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'RadioControlRenderer',
  template: `
    @if (scopedSchema) {
      <nz-form-item [class]="additionalClasses" [class.hidden]="hidden">
        @if (label && label !== '*') {
          <nz-form-label [nzFor]="id" [nzRequired]="required" [nzNoColon]="hideColonInLabel">
            @if (labelIcon) {
              <nz-icon [nzType]="labelIcon" nzTheme="outline" />
            }
            {{ label }}
          </nz-form-label>
        }
        <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="scopedSchema"></DescriptionRenderer>
        <nz-form-control [nzErrorTip]="errorMessage">
          <nz-radio-group [id]="id" [formControl]="form" (ngModelChange)="onChange($event)" nzButtonStyle="solid">
            @for (option of scopedSchema.enum; track option) {
              <label nz-radio-button [nzValue]="option">{{ option }}</label>
            }
          </nz-radio-group>
        </nz-form-control>
      </nz-form-item>
    }
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
  imports: [
    NzFormItemComponent,
    NzFormLabelComponent,
    NzIconDirective,
    DescriptionRenderer,
    NzFormControlComponent,
    NzRadioGroupComponent,
    NzRadioComponent,
    ReactiveFormsModule,
  ],
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
