import { and, Categorization, categorizationHasCategory, RankedTester, rankWith, uiTypeIs } from '@jsonforms/core';
import { Component } from '@angular/core';
import { JsonFormsBaseRenderer } from '@jsonforms/angular';

@Component({
  selector: 'jsonforms-categorization-layout',
  template: `
    <nz-tabset>
      <nz-tab *ngFor="let category of uischema.elements" [nzTitle]="category.label">
        <div *ngFor="let element of category.elements">
          <jsonforms-outlet [uischema]="element" [path]="path" [schema]="schema"></jsonforms-outlet>
        </div>
      </nz-tab>
    </nz-tabset>
  `
})
export class CategorizationTabLayoutRenderer extends JsonFormsBaseRenderer<Categorization> {
  constructor() {
    super();
  }
}

export const CategorizationTester: RankedTester = rankWith(
  1,
  and(uiTypeIs('Categorization'), categorizationHasCategory)
);
