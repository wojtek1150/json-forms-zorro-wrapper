import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { GroupLayout, RankedTester, rankWith, uiTypeIs } from '@jsonforms/core';
import { LayoutRenderer } from './layout.renderer';
import { JsonFormsAngularService } from '../jsonForms';

@Component({
  selector: 'GroupLayoutRenderer',
  template: `
    <div [class]="additionalClasses">
      <h2>{{ uischema.label }}</h2>
      <p>{{ uischema['description'] }}</p>
      <div *ngFor="let props of renderProps; trackBy: trackElement" class="control-wrapper">
        <jsonforms-outlet [renderProps]="props"></jsonforms-outlet>
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
  constructor(jsonFormsService: JsonFormsAngularService, changeDetectionRef: ChangeDetectorRef) {
    super(jsonFormsService, changeDetectionRef);
  }
}

export const GroupLayoutTester: RankedTester = rankWith(1, uiTypeIs('Group'));
