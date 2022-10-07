import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RankedTester, rankWith, uiTypeIs } from '@jsonforms/core';
import { LayoutRenderer } from './layout.renderer';
import { JsonFormsAngularService } from '../jsonForms';
import { DomSanitizer } from '@angular/platform-browser';
import { JFZVerticalLayout } from '../other/uischema';

@Component({
  selector: 'VerticalLayoutRenderer',
  template: `
    <div class="vertical-layout" [class.hidden]="hidden">
      <h2 *ngIf="uischema.label">{{ uischema.label }}</h2>
      <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="schema"></DescriptionRenderer>
      <div *ngFor="let props of renderProps; trackBy: trackElement" class="control-wrapper">
        <jsonforms-outlet [renderProps]="props"></jsonforms-outlet>
      </div>
    </div>
    <div class="submit-wrapper" *ngIf="submitLabel">
      <button nz-button nzType="primary" (click)="submit()" [nzLoading]="submitLoading">
        <span>{{ submitLabel }}</span>
      </button>
    </div>
  `,
  styles: [
    `
      .hidden {
        display: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VerticalLayoutRenderer extends LayoutRenderer<JFZVerticalLayout> {
  constructor(jsonFormsService: JsonFormsAngularService, changeDetectionRef: ChangeDetectorRef, sanitizer: DomSanitizer) {
    super(jsonFormsService, changeDetectionRef, sanitizer);
  }
}

export const VerticalLayoutTester: RankedTester = rankWith(1, uiTypeIs('VerticalLayout'));
