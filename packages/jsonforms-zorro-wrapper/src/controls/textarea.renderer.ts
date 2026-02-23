import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { DescriptionRenderer, JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { isMultiLineControl, RankedTester, rankWith } from '../core';
import { AutoSizeType, NzAutosizeDirective, NzInputDirective } from 'ng-zorro-antd/input';
import { NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { NzValidationStatusPipe } from '../other/validation-status.pipe';
import { NzAlertComponent } from 'ng-zorro-antd/alert';

@Component({
  selector: 'TextAreaRenderer',
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
        <textarea
          nz-input
          [id]="id"
          [formControl]="form"
          [placeholder]="placeholder"
          [nzAutosize]="autosize"
          (input)="onChange($event)"
          (blur)="triggerValidation()"
        ></textarea>
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
    NzAutosizeDirective,
    NzAlertComponent,
  ],
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
