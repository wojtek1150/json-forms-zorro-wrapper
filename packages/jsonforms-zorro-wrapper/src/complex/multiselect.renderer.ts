import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { Actions, and, hasType, JsonSchema, optionIs, RankedTester, rankWith, schemaMatches, schemaSubPathMatches, uiTypeIs } from '../core';
import { hasEnumItems, hasOneOfItems } from '../other/complex.helper';

@Component({
  selector: 'MultiselectControlRenderer',
  template: `
    <nz-form-item *ngIf="scopedSchema" [class]="additionalClasses" [class.hidden]="hidden">
      <nz-form-label *ngIf="label" [nzFor]="id" [nzRequired]="required" [nzNoColon]="hideColonInLabel"
        ><i *ngIf="labelIcon" nz-icon [nzType]="labelIcon" nzTheme="outline"></i> {{ label }}
      </nz-form-label>
      <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="scopedSchema"></DescriptionRenderer>
      <nz-form-control [nzHasFeedback]="showValidationStatus" [nzErrorTip]="errorMessage" [nzValidateStatus]="form.status | nzValidationStatus">
        <nz-select
          nzMode="multiple"
          [id]="id"
          [formControl]="form"
          [nzMaxTagCount]="uischema.options.nzMaxTagCount"
          [nzPlaceHolder]="placeholder"
          (ngModelChange)="onChange($event)"
          (blur)="triggerValidation()"
        >
          <nz-option *ngFor="let item of options" [nzLabel]="item.label" [nzValue]="item.value"></nz-option>
        </nz-select>
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
})
export class MultiselectControlRenderer extends JsonFormsControl {
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
    const dictionaryKey = this.uischema.options?.dictionaryKey;
    if (dictionaryKey) {
      return this.config.multiselectExternalDictionary[dictionaryKey] || [];
    }
    if (hasEnumItems(items)) {
      return items['enum'].map(label => ({ label, value: label, checked: formValue?.includes(label) }));
    }
    if (hasOneOfItems(items)) {
      return items['oneOf'].map(item => ({ label: item.title, value: item.const, checked: formValue?.includes(item.const) }));
    }
    return [];
  }
}

export const MultiselectControlRendererTester: RankedTester = rankWith(
  20,
  and(
    uiTypeIs('Control'),
    and(
      optionIs('format', 'multiselect'),
      schemaMatches(schema => hasType(schema, 'array') && !Array.isArray(schema.items) && schema.uniqueItems === true),
      schemaSubPathMatches('items', schema => {
        return hasOneOfItems(schema) || hasEnumItems(schema);
      }),
    ),
  ),
);
