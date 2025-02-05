import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { DescriptionRenderer, JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { Actions, and, hasType, JsonSchema, RankedTester, rankWith, schemaMatches, schemaSubPathMatches, uiTypeIs } from '../core';
import { hasEnumItems, hasOneOfItems } from '../other/complex.helper';
import { NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzCheckboxGroupComponent } from 'ng-zorro-antd/checkbox';
import { NzValidationStatusPipe } from '../other/validation-status.pipe';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'CheckboxGroupControlRenderer',
  template: `
    @if (scopedSchema) {
      <nz-form-item [class]="additionalClasses" [class.hidden]="hidden">
        @if (label) {
          <nz-form-label [nzFor]="id" [nzRequired]="required" [nzNoColon]="hideColonInLabel">
            @if (labelIcon) {
              <nz-icon [nzType]="labelIcon" nzTheme="outline" />
            }
            {{ label }}
          </nz-form-label>
        }
        <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="scopedSchema"></DescriptionRenderer>
        <nz-form-control [nzHasFeedback]="showValidationStatus" [nzErrorTip]="errorMessage" [nzValidateStatus]="form.status | nzValidationStatus">
          <nz-checkbox-group [nzOptions]="options" [formControl]="form" (ngModelChange)="onChange($event)"></nz-checkbox-group>
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
    NzValidationStatusPipe,
    ReactiveFormsModule,
    NzCheckboxGroupComponent,
  ],
})
export class CheckboxGroupControlRenderer extends JsonFormsControl {
  options: { label: string; value: string; checked?: boolean }[];

  constructor(jsonformsService: JsonFormsAngularService, changeDetectorRef: ChangeDetectorRef) {
    super(jsonformsService, changeDetectorRef);
  }

  override getEventValue = (event: any) => event;

  override onChange(event: string[]) {
    this.options = this.options.map(option => {
      return {
        label: option.label,
        value: option.value,
        checked: event.includes(option.value),
      };
    });
    this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => event));
    this.triggerValidation();
  }

  override mapAdditionalProps(props) {
    super.mapAdditionalProps(props);
    if (this.scopedSchema) {
      this.options = this.getOptions();
    }
  }

  private getOptions(): { label: string; value: string }[] {
    const items = this.scopedSchema.items as JsonSchema;
    const formValue = this.form.value;
    if (hasEnumItems(items)) {
      return items['enum'].map(label => ({ label, value: label, checked: formValue?.includes(label) }));
    }
    if (hasOneOfItems(items)) {
      return items['oneOf'].map(item => ({ label: item.title, value: item.const, checked: formValue?.includes(item.const) }));
    }
    return [];
  }
}

export const CheckboxGroupControlRendererTester: RankedTester = rankWith(
  5,
  and(
    uiTypeIs('Control'),
    and(
      schemaMatches(schema => hasType(schema, 'array') && !Array.isArray(schema.items) && schema.uniqueItems === true),
      schemaSubPathMatches('items', schema => {
        return hasOneOfItems(schema) || hasEnumItems(schema);
      }),
    ),
  ),
);
