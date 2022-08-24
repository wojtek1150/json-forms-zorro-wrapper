import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { GroupLayout, RankedTester, rankWith, uiTypeIs } from '@jsonforms/core';
import { LayoutRenderer } from './layout.renderer';
import { JsonFormsAngularService } from '../jsonForms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'GroupLayoutRenderer',
  template: `
    <div [class]="additionalClasses">
      <h2>{{ uischema.label }}</h2>
      <p *ngIf="!htmlDescription">{{ uischema['description'] }}</p>
      <div *ngIf="htmlDescription" [innerHTML]="sanitizedDescription"></div>
      <div *ngFor="let props of renderProps; trackBy: trackElement" class="control-wrapper">
        <jsonforms-outlet [renderProps]="props"></jsonforms-outlet>
      </div>
      <div class="submit-wrapper" *ngIf="submitLabel">
        <button nz-button nzType="primary" (click)="submit()">
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
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupLayoutRenderer extends LayoutRenderer<GroupLayout> {
  constructor(jsonFormsService: JsonFormsAngularService, changeDetectionRef: ChangeDetectorRef, sanitizer: DomSanitizer) {
    super(jsonFormsService, changeDetectionRef, sanitizer);
  }
}

export const GroupLayoutTester: RankedTester = rankWith(1, uiTypeIs('Group'));
