import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { DescriptionRenderer, JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { Actions, and, isEnumControl, isOneOfControl, optionIs, or, RankedTester, rankWith, StatePropsOfControl } from '../core';
import { NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzRadioComponent, NzRadioGroupComponent } from 'ng-zorro-antd/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { NzAlertComponent } from 'ng-zorro-antd/alert';

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
        <nz-form-control [nzErrorTip]="errorMessage" [nzWarningTip]="warningHint()">
          <nz-radio-group [id]="id" [formControl]="form" (ngModelChange)="onChange($event)" nzButtonStyle="solid">
            @for (option of options; track option.value) {
              <label nz-radio-button [nzValue]="option.value" [nzLabel]="option.label">{{ option.label }}</label>
            }
          </nz-radio-group>
          @if (uischema.messageBox && form.dirty) {
            <nz-alert
              class="message-box"
              [nzType]="uischema.messageBox.type"
              [nzMessage]="uischema.messageBox.title"
              [nzDescription]="uischema.messageBox.content"
              [nzShowIcon]="true"
            />
          }
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
    NzAlertComponent,
  ],
})
export class RadioButtonControlRenderer extends JsonFormsControl {
  options: {
    label: string;
    value: any;
  }[];
  private selectedValue: string;

  constructor(jsonformsService: JsonFormsAngularService, changeDetectorRef: ChangeDetectorRef) {
    super(jsonformsService, changeDetectorRef);
  }

  override getEventValue = (event: any) => event || undefined;

  override onChange(event: string) {
    if (this.selectedValue !== event) {
      this.selectedValue = event;
      this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => event));
      this.triggerValidation();
    }
  }

  override mapAdditionalProps(props: StatePropsOfControl) {
    super.mapAdditionalProps(props);
    if (this.scopedSchema.enum) {
      this.options = this.scopedSchema.enum.map(option => ({ label: option, value: option }));
    } else {
      this.options = this.scopedSchema.oneOf.map(option => ({ label: option.title, value: option.const }));
    }
  }
}

export const RadioButtonControlRendererTester: RankedTester = rankWith(
  20,
  and(or(isEnumControl, isOneOfControl), optionIs('format', 'radio-button')),
);
