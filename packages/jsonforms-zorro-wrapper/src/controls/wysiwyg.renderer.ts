import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { DescriptionRenderer, JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { Actions, and, type JsonSchema, optionIs, RankedTester, rankWith, Resolve, uiTypeIs, ValidationError } from '../core';
import { NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { QuillEditorComponent } from 'ngx-quill';
import { ReactiveFormsModule } from '@angular/forms';
import { NzValidationStatusPipe } from '../other/validation-status.pipe';
import { ContentChange } from 'ngx-quill/lib/quill-editor.component';
import { takeUntil } from 'rxjs';
import Quill from 'quill/core/quill';

@Component({
  selector: 'WysiwygRenderer',
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
      <nz-form-control [nzHasFeedback]="showValidationStatus" [nzErrorTip]="errorMessage" [nzValidateStatus]="errorStatus | nzValidationStatus">
        <quill-editor
          [id]="id"
          [formControl]="form"
          [modules]="editorModules"
          [formats]="formats"
          linkPlaceholder="Paste your link here"
          [placeholder]="placeholder"
          (onEditorCreated)="created($event)"
          (onContentChanged)="onChange($event)"
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
  imports: [
    NzFormItemComponent,
    NzFormLabelComponent,
    NzIconDirective,
    DescriptionRenderer,
    NzFormControlComponent,
    QuillEditorComponent,
    ReactiveFormsModule,
    NzValidationStatusPipe,
  ],
  standalone: true,
})
export class WysiwygRenderer extends JsonFormsControl {
  hasExternalValidation: boolean = false;
  stringFieldPostfix = '_plain_text';
  editorModules = {
    toolbar: [],
  };
  formats = null;
  stringFieldErrorMessages: string[] = [];
  externalFieldSchema: JsonSchema;

  constructor(jsonformsService: JsonFormsAngularService, changeDetectorRef: ChangeDetectorRef) {
    super(jsonformsService, changeDetectorRef);
  }

  get errorStatus(): string {
    return this.hasExternalValidation && this.stringFieldErrorMessages.length ? 'INVALID' : this.form.status;
  }

  override get errorMessage(): string | null {
    const schemaError = this.hasExternalValidation ? this.externalFieldSchema['errorMessage'] : this.scopedSchema['errorMessage'];

    if (schemaError) {
      return schemaError;
    }

    if (this.hasExternalValidation && this.stringFieldErrorMessages.length) {
      return this.stringFieldErrorMessages.join(', ');
    }

    return this.error;
  }

  override getEventValue = (event: any) => (event === '<p></p>' ? undefined : event);

  override mapAdditionalProps(props): void {
    super.mapAdditionalProps(props);
    if (this.uischema) {
      this.editorModules.toolbar = this.uischema.options.toolbar || [
        ['bold', 'italic', 'underline'],
        ['link'],
        [{ list: 'ordered' }, { list: 'bullet' }],
      ];
      this.formats = this.uischema.options.formats || null;
    }
  }

  override onChange(content: ContentChange): void {
    this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => this.getEventValue(content.html)));
    if (this.uischema?.options.withStringValidation) {
      this.jsonFormsService.updateCore(Actions.update(this.propsPath + this.stringFieldPostfix, () => content.text.trim() || undefined));
    }
    this.triggerValidation();
  }

  override ngOnInit(): void {
    super.ngOnInit();
    if (this.uischema?.options.withStringValidation) {
      this.hasExternalValidation = true;
      this.stringFieldPostfix = this.uischema.options.withStringValidation === true ? '_plain_text' : this.uischema.options.withStringValidation;

      this.externalFieldSchema = Resolve.schema(
        this.jsonFormsService.getState().jsonforms.core.schema,
        this.uischema.scope + this.stringFieldPostfix,
        this.rootSchema,
      );

      this.jsonFormsService.$allErrors.pipe(takeUntil(this.destroy$)).subscribe((errors: ValidationError[]) => {
        this.stringFieldErrorMessages = errors
          .filter(err => err.instancePath === this.instancePath + this.stringFieldPostfix)
          .map(err => err.message);
        if (this.stringFieldErrorMessages.length) {
          this.form.setErrors(this.stringFieldErrorMessages);
        }
      });
    }
  }

  created(quill: Quill): void {
    if (this.uischema?.options.withStringValidation && !this.hidden && quill.getText().trim()) {
      this.jsonFormsService.updateCore(Actions.update(this.propsPath + this.stringFieldPostfix, () => quill.getText().trim()));
    }
  }
}

export const WysiwygRendererTester: RankedTester = rankWith(3, and(uiTypeIs('Control'), optionIs('wysiwyg', true)));
