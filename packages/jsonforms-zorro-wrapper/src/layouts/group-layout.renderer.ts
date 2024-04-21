import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RankedTester, rankWith, uiTypeIs } from '../core';
import { LayoutRenderer } from './layout.renderer';
import { DescriptionRenderer, JsonFormsAngularService, JsonFormsOutlet } from '../jsonForms';
import { DomSanitizer } from '@angular/platform-browser';
import { JFZGroupLayout } from '../other/uischema';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'GroupLayoutRenderer',
  template: `
    <div [class]="additionalClasses" [class.hidden]="hidden">
      @if (uischema.label) {
        <h2>{{ uischema.label }}</h2>
      }
      <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="schema"></DescriptionRenderer>
      @for (props of renderProps; track trackElement($index, props)) {
        <div class="control-wrapper">
          <jsonforms-outlet [renderProps]="props"></jsonforms-outlet>
        </div>
      }
      @if (submitLabel) {
        <div class="submit-wrapper">
          <button nz-button nzType="primary" (click)="submit()" [nzLoading]="submitLoading">
            <span>{{ submitLabel }}</span>
          </button>
        </div>
      }
    </div>
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
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DescriptionRenderer, JsonFormsOutlet, NzButtonComponent],
})
export class GroupLayoutRenderer extends LayoutRenderer<JFZGroupLayout> {
  constructor(jsonFormsService: JsonFormsAngularService, changeDetectionRef: ChangeDetectorRef, sanitizer: DomSanitizer) {
    super(jsonFormsService, changeDetectionRef, sanitizer);
  }
}

export const GroupLayoutTester: RankedTester = rankWith(1, uiTypeIs('Group'));
