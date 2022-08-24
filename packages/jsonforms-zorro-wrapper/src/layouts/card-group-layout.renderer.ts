import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { GroupLayout, RankedTester, rankWith, uiTypeIs } from '@jsonforms/core';
import { LayoutRenderer } from './layout.renderer';
import { JsonFormsAngularService } from '../jsonForms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'CardGroupLayoutRenderer',
  template: `
    <nz-card [nzTitle]="uischema.label">
      <div *ngFor="let props of renderProps; trackBy: trackElement" class="control-wrapper">
        <jsonforms-outlet [renderProps]="props"></jsonforms-outlet>
      </div>
    </nz-card>
  `,
  styles: [
    `
      nz-card {
        margin-bottom: 16px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardGroupLayoutRenderer extends LayoutRenderer<GroupLayout> {
  constructor(jsonFormsService: JsonFormsAngularService, changeDetectionRef: ChangeDetectorRef, sanitizer: DomSanitizer) {
    super(jsonFormsService, changeDetectionRef, sanitizer);
  }
}

export const CardGroupLayoutTester: RankedTester = rankWith(1, uiTypeIs('CardGroup'));
