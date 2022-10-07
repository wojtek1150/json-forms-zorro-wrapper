import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RankedTester, rankWith, uiTypeIs } from '@jsonforms/core';
import { LayoutRenderer } from './layout.renderer';
import { JsonFormsAngularService } from '../jsonForms';
import { DomSanitizer } from '@angular/platform-browser';
import { JFZGroupLayout } from '../other/uischema';

@Component({
  selector: 'GroupLayoutRenderer',
  template: `
    <div [class]="additionalClasses" [class.hidden]="hidden">
      <h2 *ngIf="uischema.label">{{ uischema.label }}</h2>
      <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="schema"></DescriptionRenderer>
      <div *ngFor="let props of renderProps; trackBy: trackElement" class="control-wrapper">
        <jsonforms-outlet [renderProps]="props"></jsonforms-outlet>
      </div>
      <div class="submit-wrapper" *ngIf="submitLabel">
        <button nz-button nzType="primary" (click)="submit()" [nzLoading]="submitLoading">
          <span>{{ submitLabel }}</span>
        </button>
      </div>
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupLayoutRenderer extends LayoutRenderer<JFZGroupLayout> {
  constructor(jsonFormsService: JsonFormsAngularService, changeDetectionRef: ChangeDetectorRef, sanitizer: DomSanitizer) {
    super(jsonFormsService, changeDetectionRef, sanitizer);
  }
}

export const GroupLayoutTester: RankedTester = rankWith(1, uiTypeIs('Group'));
