import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RankedTester, rankWith, uiTypeIs, VerticalLayout } from '@jsonforms/core';
import { LayoutRenderer } from './layout.renderer';
import { JsonFormsAngularService } from '../jsonForms';

@Component({
  selector: 'VerticalLayoutRenderer',
  template: `
    <div class="vertical-layout">
      <div *ngFor="let props of renderProps; trackBy: trackElement" class="control-wrapper">
        <jsonforms-outlet [renderProps]="props"></jsonforms-outlet>
      </div>
    </div>
    <div class="submit-wrapper" *ngIf="submitLabel">
      <button nz-button nzType="primary" (click)="submit()">
        <span>{{ submitLabel }}</span>
      </button>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalLayoutRenderer extends LayoutRenderer<VerticalLayout> {
  constructor(jsonFormsService: JsonFormsAngularService, changeDetectionRef: ChangeDetectorRef) {
    super(jsonFormsService, changeDetectionRef);
  }
}

export const VerticalLayoutTester: RankedTester = rankWith(1, uiTypeIs('VerticalLayout'));
