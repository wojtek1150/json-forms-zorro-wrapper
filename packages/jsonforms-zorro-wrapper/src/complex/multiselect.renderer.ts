import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, signal } from '@angular/core';
import { DescriptionRenderer, JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { Actions, and, hasType, JsonSchema, optionIs, RankedTester, rankWith, schemaMatches, schemaSubPathMatches, uiTypeIs } from '../core';
import { hasEnumItems, hasOneOfItems } from '../other/complex.helper';
import { NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NzValidationStatusPipe } from '../other/validation-status.pipe';
import { MultiselectExternalDictionaryItem } from '../other/config';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'MultiselectControlRenderer',
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
        <nz-form-control [nzHasFeedback]="showValidationStatus" [nzErrorTip]="errorMessage" [nzValidateStatus]="errorStatus | nzValidationStatus">
          <nz-select
            nzMode="multiple"
            [id]="id"
            [formControl]="form"
            [nzMaxTagCount]="uischema.options.nzMaxTagCount || INFINITY"
            [nzPlaceHolder]="placeholder"
            [nzCustomTemplate]="selectedValueTemplate"
            (ngModelChange)="onChange($event)"
            (blur)="triggerValidation()"
          >
            @for (item of options(); track item) {
              <nz-option nzCustomContent [nzLabel]="item.label" [nzValue]="item.value">
                {{ item.label }}
                @if (item.additionalLabel) {
                  <span [style.color]="item.additionalLabelColor">{{ item.additionalLabel }}</span>
                }
              </nz-option>
            }
          </nz-select>
          <ng-template #selectedValueTemplate let-selected>
            <div class="ant-select-selection-item-content">
              {{ selected.nzLabel }}
              @let option = optionsEntities()[selected.nzValue];
              @if (option.additionalLabel) {
                <span [style.color]="option.additionalLabelColor">{{ option.additionalLabel }}</span>
              }
            </div>
          </ng-template>
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
    NzSelectComponent,
    ReactiveFormsModule,
    NzValidationStatusPipe,
    NzOptionComponent,
  ],
})
export class MultiselectControlRenderer extends JsonFormsControl {
  readonly INFINITY = Infinity;

  options = signal<MultiselectExternalDictionaryItem[]>([]);
  optionsEntities = computed(() =>
    this.options().reduce((acc, option) => {
      acc[option.value] = option;
      return acc;
    }, {}),
  );
  value = toSignal<string[] | undefined>(this.form.valueChanges);
  hasUnsupportedValueSelected = computed(() => this.value()?.some(el => this.optionsEntities()[el]?.unsupported));

  constructor(jsonformsService: JsonFormsAngularService, changeDetectorRef: ChangeDetectorRef) {
    super(jsonformsService, changeDetectorRef);
  }

  get errorStatus(): string {
    return this.hasUnsupportedValueSelected() ? 'INVALID' : this.form.status;
  }

  override get errorMessage(): string | null {
    if (this.hasUnsupportedValueSelected()) {
      return this.scopedSchema['unsupportedValuesErrorMessage'] || 'This field cannot contain unsupported values';
    }

    if (this.scopedSchema['errorMessage']) {
      return this.scopedSchema['errorMessage'];
    }

    return this.error;
  }

  override onChange(event: string[]) {
    this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => event));
    this.triggerValidation();
  }

  override mapAdditionalProps(props) {
    super.mapAdditionalProps(props);
    if (this.scopedSchema) {
      this.options.set(this.getOptions());
    }
  }

  private getOptions(): MultiselectExternalDictionaryItem[] {
    const dictionaryKey = this.uischema.options?.dictionaryKey;
    if (dictionaryKey) {
      return this.config.multiselectExternalDictionary[dictionaryKey] || [];
    }

    const items = this.scopedSchema.items as JsonSchema;
    if (hasEnumItems(items)) {
      return items['enum'].map(label => ({ label, value: label }));
    }
    if (hasOneOfItems(items)) {
      return items['oneOf'].map(item => ({ label: item.title, value: item.const }));
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
