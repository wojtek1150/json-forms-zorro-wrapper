import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RankedTester, rankWith, uiTypeIs } from '../core';
import { LayoutRenderer } from './layout.renderer';
import { DescriptionRenderer, JsonFormsAngularService, JsonFormsOutlet } from '../jsonForms';
import { DomSanitizer } from '@angular/platform-browser';
import { JFZVerticalLayout } from '../other/uischema';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'VerticalLayoutRenderer',
  template: `
    <div class="vertical-layout" [class.hidden]="hidden">
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
    @if (submitLabel || cancelLabel) {
      <div class="submit-wrapper">
        @if (cancelLabel) {
          <button nz-button nzType="default" (click)="cancel()" [nzLoading]="cancelLoading">
            <span>{{ cancelLabel }}</span>
          </button>
        }
        @if (submitLabel) {
          <button nz-button nzType="primary" (click)="submit()" [nzLoading]="submitLoading">
            <span>{{ submitLabel }}</span>
          </button>
        }
      </div>
    }
  `,
  styles: [
    `
      .hidden {
        display: none;
      }

      .submit-wrapper {
        display: flex;
        gap: 10px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DescriptionRenderer, JsonFormsOutlet, NzButtonComponent],
})
export class VerticalLayoutRenderer extends LayoutRenderer<JFZVerticalLayout> {
  constructor(jsonFormsService: JsonFormsAngularService, changeDetectionRef: ChangeDetectorRef, sanitizer: DomSanitizer) {
    super(jsonFormsService, changeDetectionRef, sanitizer);
  }
}

export const VerticalLayoutTester: RankedTester = rankWith(1, uiTypeIs('VerticalLayout'));
