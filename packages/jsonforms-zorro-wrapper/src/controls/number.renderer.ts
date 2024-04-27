import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { DescriptionRenderer, JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { Actions, isIntegerControl, isNumberControl, or, RankedTester, rankWith, StatePropsOfControl } from '../core';
import { NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzInputNumberComponent } from 'ng-zorro-antd/input-number';
import { NzValidationStatusPipe } from '../other/validation-status.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'NumberControlRenderer',
  template: `
    <nz-form-item [class]="additionalClasses" [class.hidden]="hidden">
      @if (label && label !== '*') {
        <nz-form-label [nzFor]="id" [nzRequired]="required" [nzNoColon]="hideColonInLabel">
          @if (labelIcon) {
            <i nz-icon [nzType]="labelIcon" nzTheme="outline"></i>
          }
          {{ label }}
        </nz-form-label>
      }
      <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="scopedSchema"></DescriptionRenderer>
      <nz-form-control [nzHasFeedback]="showValidationStatus" [nzErrorTip]="errorMessage" [nzValidateStatus]="form.status | nzValidationStatus">
        <nz-input-number
          [id]="id"
          [formControl]="form"
          [nzMin]="min"
          [nzMax]="max"
          [nzStep]="stepper"
          [nzPlaceHolder]="placeholder || ''"
          [nzDisabled]="!isEnabled"
          (ngModelChange)="onChange($event)"
          (blur)="triggerValidation()"
        ></nz-input-number>
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
  imports: [
    NzFormItemComponent,
    NzFormLabelComponent,
    NzIconDirective,
    DescriptionRenderer,
    NzFormControlComponent,
    NzInputNumberComponent,
    NzValidationStatusPipe,
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class NumberControlRenderer extends JsonFormsControl {
  oldValue: string;
  min: number;
  max: number;
  stepper: number;

  selectedValue: number;

  constructor(jsonformsService: JsonFormsAngularService, changeDetectorRef: ChangeDetectorRef) {
    super(jsonformsService, changeDetectorRef);
  }

  override getEventValue = (event: number) => event;

  override onChange(ev: number) {
    if (this.selectedValue !== ev) {
      this.selectedValue = ev;
      this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => ev));
      this.triggerValidation();
    }
  }

  override mapAdditionalProps(props: StatePropsOfControl) {
    if (this.scopedSchema) {
      const testerContext = {
        rootSchema: this.rootSchema,
        config: props.config,
      };
      const defaultStep = isNumberControl(this.uischema, this.rootSchema, testerContext) ? 0.1 : 1;
      this.min = this.scopedSchema.minimum;
      this.max = this.scopedSchema.maximum;
      this.stepper = this.scopedSchema.multipleOf || defaultStep;
    }
  }
}

export const NumberControlRendererTester: RankedTester = rankWith(2, or(isNumberControl, isIntegerControl));
