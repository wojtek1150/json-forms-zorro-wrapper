import { ChangeDetectionStrategy, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { Actions, and, hasType, JsonSchema, RankedTester, rankWith, schemaMatches, schemaSubPathMatches, uiTypeIs } from '@jsonforms/core';
import { hasEnumItems, hasOneOfItems } from '../other/complex.helper';

@Component({
  selector: 'CheckboxGroupControlRenderer',
  template: `
    <nz-form-item *ngIf="scopedSchema" [class]="additionalClasses">
      <nz-form-label *ngIf="label" [nzFor]="id"><i *ngIf="labelIcon" nz-icon [nzType]="labelIcon" nzTheme="outline"></i> {{ label }}</nz-form-label>
      <div class="description">{{ description }}</div>
      <nz-form-control [nzErrorTip]="error">
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

      .description {
        font-size: 0.75em;
        margin: 0.25em 0 0.5em;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxGroupControlRenderer extends JsonFormsControl {
  options: { label: string; value: string; checked?: boolean }[];

  constructor(jsonformsService: JsonFormsAngularService) {
    super(jsonformsService);
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
