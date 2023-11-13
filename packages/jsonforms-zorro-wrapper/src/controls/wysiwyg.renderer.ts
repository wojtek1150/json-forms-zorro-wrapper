import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { and, optionIs, RankedTester, rankWith, uiTypeIs } from '../core';
import { AutoSizeType } from 'ng-zorro-antd/input';

@Component({
  selector: 'WysiwygRenderer',
  template: `
    <nz-form-item [class]="additionalClasses" [class.hidden]="hidden">
      <nz-form-label *ngIf="label && label !== '*'" [nzFor]="id" [nzRequired]="required" [nzNoColon]="hideColonInLabel"
        ><i *ngIf="labelIcon" nz-icon [nzType]="labelIcon" nzTheme="outline"></i> {{ label }}</nz-form-label
      >
      <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="scopedSchema"></DescriptionRenderer>
      <nz-form-control [nzHasFeedback]="showValidationStatus" [nzErrorTip]="errorMessage" [nzValidateStatus]="form.status | nzValidationStatus">
        <quill-editor
          [id]="id"
          [formControl]="form"
          [modules]="editorModules"
          linkPlaceholder="Paste your link here"
          [placeholder]="placeholder"
          (ngModelChange)="onChange($event)"
          [styles]="{ minHeight: '100px' }"
          (blur)="triggerValidation()"
        ></quill-editor>
      </nz-form-control>
    </nz-form-item>
  `,
  styles: [
    `
      nz-form-item {
        display: block;
      }

      quill-editor {
        display: block;
      }

      .hidden {
        display: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WysiwygRenderer extends JsonFormsControl {
  autosize: string | boolean | AutoSizeType;
  editorModules = {
    toolbar: [],
  };

  constructor(jsonformsService: JsonFormsAngularService, changeDetectorRef: ChangeDetectorRef) {
    super(jsonformsService, changeDetectorRef);
  }

  override getEventValue = (event: any) => event;

  override mapAdditionalProps(props) {
    super.mapAdditionalProps(props);
    if (this.uischema) {
      this.editorModules.toolbar = this.uischema.options.toolbar || [
        ['bold', 'italic', 'underline'],
        ['link'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ];
    }
  }
}

export const WysiwygRendererTester: RankedTester = rankWith(3, and(uiTypeIs('Control'), optionIs('wysiwyg', true)));
