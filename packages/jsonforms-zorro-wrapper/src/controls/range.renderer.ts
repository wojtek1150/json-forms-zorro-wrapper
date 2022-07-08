import { ChangeDetectionStrategy, Component, ChangeDetectorRef } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '../jsonForms';
import { isRangeControl, RankedTester, rankWith } from '@jsonforms/core';

@Component({
  selector: 'RangeControlRenderer',
  template: `
    <nz-form-item [class]="additionalClasses">
      <nz-form-label *ngIf="label" [nzFor]="id"><i *ngIf="labelIcon" nz-icon [nzType]="labelIcon" nzTheme="outline"></i> {{ label }}</nz-form-label>
      <div class="description">{{ description }}</div>
      <nz-form-control>
        <nz-slider [id]="id" [formControl]="form" [nzDisabled]="!isEnabled()" [nzMin]="min" [nzMax]="max" [nzStep]="multipleOf"></nz-slider>
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
export class RangeControlRenderer extends JsonFormsControl {
  min: number;
  max: number;
  multipleOf: number;

  constructor(jsonformsService: JsonFormsAngularService, private changeDetectorRef: ChangeDetectorRef) {
    super(jsonformsService);
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
