import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RankedTester, rankWith, uiTypeIs } from '../core';
import { LayoutRenderer } from './layout.renderer';
import { DescriptionRenderer, JsonFormsAngularService, JsonFormsOutlet } from '../jsonForms';
import { DomSanitizer } from '@angular/platform-browser';
import { JFZHorizontalLayout } from '../other/uischema';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'HorizontalLayoutRenderer',
  template: `
    <div class="horizontal-layout" [class.hidden]="hidden">
      @if (uischema.label) {
        <h2>{{ uischema.label }}</h2>
      }
      <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="schema"></DescriptionRenderer>
      @for (props of renderProps; track trackElement($index, props)) {
        <div class="control-wrapper">
          <jsonforms-outlet [renderProps]="props"></jsonforms-outlet>
        </div>
      }
    </div>
    @if (submitLabel) {
      <div class="submit-wrapper">
        <button nz-button nzType="primary" (click)="submit()" [nzLoading]="submitLoading">
          <span>{{ submitLabel }}</span>
        </button>
      </div>
    }
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

      .hidden {
        display: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DescriptionRenderer, JsonFormsOutlet, NzButtonComponent],
})
export class HorizontalLayoutRenderer extends LayoutRenderer<JFZHorizontalLayout> {
  constructor(jsonFormsService: JsonFormsAngularService, changeDetectionRef: ChangeDetectorRef, sanitizer: DomSanitizer) {
    super(jsonFormsService, changeDetectionRef, sanitizer);
  }
}

export const HorizontalLayoutTester: RankedTester = rankWith(1, uiTypeIs('HorizontalLayout'));
