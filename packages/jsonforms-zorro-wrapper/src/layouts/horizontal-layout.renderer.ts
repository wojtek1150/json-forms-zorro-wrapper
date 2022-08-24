import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RankedTester, rankWith, uiTypeIs } from '@jsonforms/core';
import { LayoutRenderer } from './layout.renderer';
import { JsonFormsAngularService } from '../jsonForms';
import { DomSanitizer } from '@angular/platform-browser';
import { JFZHorizontalLayout } from '../other/uischema';

@Component({
  selector: 'HorizontalLayoutRenderer',
  template: `
    <div class="horizontal-layout">
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
  styles: [
    `
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
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HorizontalLayoutRenderer extends LayoutRenderer<JFZHorizontalLayout> {
  constructor(jsonFormsService: JsonFormsAngularService, changeDetectionRef: ChangeDetectorRef, sanitizer: DomSanitizer) {
    super(jsonFormsService, changeDetectionRef, sanitizer);
  }
}

export const HorizontalLayoutTester: RankedTester = rankWith(1, uiTypeIs('HorizontalLayout'));
