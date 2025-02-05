import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { DescriptionRenderer, JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { isRangeControl, RankedTester, rankWith } from '../core';
import { NzFormControlComponent, NzFormItemComponent, NzFormLabelComponent } from 'ng-zorro-antd/form';
import { NzIconDirective } from 'ng-zorro-antd/icon';
import { NzSliderComponent } from 'ng-zorro-antd/slider';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'RangeControlRenderer',
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
      <nz-form-control>
        <nz-slider [id]="id" [formControl]="form" [nzDisabled]="!isEnabled" [nzMin]="min" [nzMax]="max" [nzStep]="multipleOf"></nz-slider>
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
    NzSliderComponent,
    ReactiveFormsModule,
  ],
})
export class RangeControlRenderer extends JsonFormsControl {
  min: number;
  max: number;
  multipleOf: number;

  constructor(jsonformsService: JsonFormsAngularService, changeDetectorRef: ChangeDetectorRef) {
    super(jsonformsService, changeDetectorRef);
  }

  override getEventValue = (event: any) => Number(event.value);

  override mapAdditionalProps() {
    if (this.scopedSchema) {
      this.min = this.scopedSchema.minimum;
      this.max = this.scopedSchema.maximum;
      this.multipleOf = this.scopedSchema.multipleOf || 1;
    }
    this.changeDetectorRef.markForCheck();
  }
}

export const RangeControlRendererTester: RankedTester = rankWith(4, isRangeControl);
