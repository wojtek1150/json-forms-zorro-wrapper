import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RankedTester, rankWith, uiTypeIs } from '../core';
import { LayoutRenderer } from './layout.renderer';
import { DescriptionRenderer, JsonFormsAngularService, JsonFormsOutlet } from '../jsonForms';
import { DomSanitizer } from '@angular/platform-browser';
import { JFZCardGroupLayout } from '../other/uischema';
import { NzCardComponent } from 'ng-zorro-antd/card';

@Component({
  selector: 'CardGroupLayoutRenderer',
  template: `
    <nz-card [nzTitle]="uischema.label" [class.hidden]="hidden">
      <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="schema"></DescriptionRenderer>
      @for (props of renderProps; track trackElement($index, props)) {
        <div class="control-wrapper">
          <jsonforms-outlet [renderProps]="props"></jsonforms-outlet>
        </div>
      }
    </nz-card>
  `,
  styles: [
    `
      nz-card {
        margin-bottom: 16px;
      }

      .hidden {
        display: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DescriptionRenderer, NzCardComponent, JsonFormsOutlet],
})
export class CardGroupLayoutRenderer extends LayoutRenderer<JFZCardGroupLayout> {
  constructor(jsonFormsService: JsonFormsAngularService, changeDetectionRef: ChangeDetectorRef, sanitizer: DomSanitizer) {
    super(jsonFormsService, changeDetectionRef, sanitizer);
  }
}

export const CardGroupLayoutTester: RankedTester = rankWith(1, uiTypeIs('CardGroup'));
