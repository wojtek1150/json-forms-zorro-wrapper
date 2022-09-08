import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { Actions, and, hasType, JsonSchema, RankedTester, rankWith, schemaMatches, schemaSubPathMatches, uiTypeIs } from '@jsonforms/core';
import { hasEnumItems, hasOneOfItems } from '../other/complex.helper';

@Component({
  selector: 'CheckboxGroupControlRenderer',
  template: `
    <nz-form-item *ngIf="scopedSchema" [class]="additionalClasses" [class.hidden]="hidden">
      <nz-form-label *ngIf="label" [nzFor]="id" [nzRequired]="required" [nzNoColon]="hideColonInLabel"
        ><i *ngIf="labelIcon" nz-icon [nzType]="labelIcon" nzTheme="outline"></i> {{ label }}
      </nz-form-label>
      <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="schema"></DescriptionRenderer>
      <nz-form-control [nzErrorTip]="errorMessage">
        <nz-checkbox-wrapper (nzOnChange)="onChange($event)">
          <label nz-checkbox *ngFor="let option of options" [nzValue]="option.value" [nzChecked]="option.checked">{{ option.label }}</label>
        </nz-checkbox-wrapper>
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
      })
    )
  )
);
