import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { HorizontalLayout, RankedTester, rankWith, uiTypeIs } from '@jsonforms/core';
import { LayoutRenderer } from './layout.renderer';
import { JsonFormsAngularService } from '@jsonforms/angular';

@Component({
  selector: 'HorizontalLayoutRenderer',
  template: `
    <div class="horizontal-layout">
      <div *ngFor="let props of renderProps; trackBy: trackElement" class="control-wrapper">
        <jsonforms-outlet [renderProps]="props"></jsonforms-outlet>
      </div>
    </div>
  `,
  styles: [`
    .horizontal-layout {
      display: flex;
    }

    .control-wrapper {
      flex-basis: 0;
      flex-grow: 1;
      max-width: 100%;
      padding-top: 16px;
      padding-left: 16px;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HorizontalLayoutRenderer extends LayoutRenderer<HorizontalLayout> {
  constructor(jsonFormsService: JsonFormsAngularService, changeDetectionRef: ChangeDetectorRef) {
    super(jsonFormsService, changeDetectionRef);
  }
}

export const HorizontalLayoutTester: RankedTester = rankWith(
  1,
  uiTypeIs('HorizontalLayout')
);
