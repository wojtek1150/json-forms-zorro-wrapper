import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, signal } from '@angular/core';
import { DescriptionRenderer, JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { Actions, isEnumControl, isOneOfControl, or, RankedTester, rankWith, StatePropsOfControl } from '../core';
import { NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzOptionComponent, NzSelectComponent } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
import { NzValidationStatusPipe } from '../other/validation-status.pipe';
import { NzAlertComponent } from 'ng-zorro-antd/alert';
import { isEqual } from 'lodash-es';
import { SelectExternalDictionaryItem } from '../models/config';

@Component({
  selector: 'SelectControlRenderer',
  template: `
    @if (scopedSchema) {
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
          <nz-select
            [nzShowSearch]="true"
            [nzAllowClear]="true"
            [id]="id"
            [formControl]="form"
            [nzPlaceHolder]="placeholder"
            [compareWith]="compareByValue"
            (ngModelChange)="onChange($event)"
            (blur)="triggerValidation()"
            [nzCustomTemplate]="selectedValueTemplate"
          >
            @for (option of options(); track option.value) {
              <nz-option nzCustomContent [nzLabel]="option.label" [nzValue]="option.value">
                {{ option.label }}
                @if (option.additionalLabel) {
                  <span [style.color]="option.additionalLabelColor">{{ option.additionalLabel }}</span>
                }
              </nz-option>
            }
          </nz-select>

          <ng-template #selectedValueTemplate let-selected>
            {{ selected.nzLabel }}
            @let option = optionsEntities()[selected.nzLabel];
            @if (option.additionalLabel) {
              <span [style.color]="option.additionalLabelColor">{{ option.additionalLabel }}</span>
            }
          </ng-template>

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
    NzOptionComponent,
    NzValidationStatusPipe,
    NzAlertComponent,
  ],
})
export class SelectControlRenderer extends JsonFormsControl {
  options = signal<SelectExternalDictionaryItem[]>([]);
  optionsEntities = computed(() =>
    this.options().reduce((acc, option) => {
      acc[option.label] = option;
      return acc;
    }, {}),
  );
  value = signal<string | undefined>(undefined);
  hasUnsupportedValueSelected = computed(() => this.options().find(el => this.compareByValue(el.value, this.value()))?.unsupported);

  constructor(jsonformsService: JsonFormsAngularService, changeDetectorRef: ChangeDetectorRef) {
    super(jsonformsService, changeDetectorRef);
  }

  override getEventValue = (event: any) => event ?? undefined;

  compareByValue = (first: any, second: any): boolean => isEqual(first, second);

  override get errorStatus(): string {
    return this.hasUnsupportedValueSelected() ? 'INVALID' : super.errorStatus;
  }

  override get errorMessage(): string | null {
    if (this.hasUnsupportedValueSelected()) {
      return this.scopedSchema['unsupportedValueErrorMessage'] || 'This field cannot contain unsupported value';
    }

    if (this.scopedSchema['errorMessage']) {
      return this.scopedSchema['errorMessage'];
    }

    return this.error;
  }

  override onChange(event: any) {
    const nextValue = this.getEventValue(event);
    if (!this.compareByValue(this.value(), nextValue)) {
      this.value.set(nextValue);
      this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => nextValue));
      this.triggerValidation();
    }
  }

  override mapAdditionalProps(props: StatePropsOfControl) {
    super.mapAdditionalProps(props);
    this.value.set(this.data);

    const dictionaryKey = this.uischema.options?.dictionaryKey;
    if (dictionaryKey) {
      this.options.set(this.config.selectExternalDictionary[dictionaryKey] || []);
      return;
    }

    if (this.scopedSchema.type === 'object') {
      const labelKey = this.uischema.options?.labelKey || 'label';
      if (this.scopedSchema.enum) {
        this.options.set(this.scopedSchema.enum.map(option => ({ label: option[labelKey], value: option })));
      } else {
        this.options.set(this.scopedSchema.oneOf.map(option => ({ label: option[labelKey], value: option.const })));
      }
    } else {
      if (this.scopedSchema.enum) {
        this.options.set(this.scopedSchema.enum.map(option => ({ label: option, value: option })));
      } else {
        this.options.set(this.scopedSchema.oneOf.map(option => ({ label: option.title, value: option.const })));
      }
    }
  }
}

export const SelectControlTester: RankedTester = rankWith(2, or(isEnumControl, isOneOfControl));
