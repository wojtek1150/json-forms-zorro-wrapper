import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { DescriptionRenderer, JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { isStringControl, RankedTester, rankWith } from '../core';
import { NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzInputDirective } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzValidationStatusPipe } from '../other/validation-status.pipe';
import { NzAlertComponent } from 'ng-zorro-antd/alert';

@Component({
  selector: 'TextControlRenderer',
  template: `
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
      <nz-form-control
        [nzHasFeedback]="showValidationStatus"
        [nzErrorTip]="errorMessage"
        [nzWarningTip]="warningHint()"
        [nzValidateStatus]="errorStatus | nzValidationStatus"
      >
        <input
          nz-input
          [id]="id"
          [formControl]="form"
          [placeholder]="placeholder"
          [type]="type"
          (input)="onChange($event)"
          (blur)="triggerValidation()"
        />
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
    NzInputDirective,
    ReactiveFormsModule,
    NzValidationStatusPipe,
    NzAlertComponent,
  ],
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
