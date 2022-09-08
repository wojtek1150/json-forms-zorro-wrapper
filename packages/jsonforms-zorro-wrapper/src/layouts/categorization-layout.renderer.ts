import { and, categorizationHasCategory, JsonFormsState, mapStateToLayoutProps, RankedTester, rankWith, uiTypeIs } from '@jsonforms/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { JsonFormsAngularService, JsonFormsBaseRenderer } from '../jsonForms';
import { JFZCategorizationSchema } from '../other/uischema';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jsonforms-categorization-layout',
  template: `
    <nz-tabset [class.hidden]="hidden">
      <nz-tab *ngFor="let category of uischema.elements" [nzTitle]="category.label">
        <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="schema"></DescriptionRenderer>
        <div *ngFor="let element of category.elements">
          <jsonforms-outlet [uischema]="element" [path]="path" [schema]="schema"></jsonforms-outlet>
        </div>
      </nz-tab>
    </nz-tabset>
  `,
  styles: [
    `
      .hidden {
        display: none;
      }
    `,
  ],
})
export class CategorizationTabLayoutRenderer extends JsonFormsBaseRenderer<JFZCategorizationSchema> implements OnInit, OnDestroy {
  hidden = false;
  private subscription = new Subscription();

  constructor(private jsonFormsService: JsonFormsAngularService) {
    super();
  }

  ngOnInit() {
    this.subscription = this.jsonFormsService.$state.subscribe({
      next: (state: JsonFormsState) => {
        const props = mapStateToLayoutProps(state, this.getOwnProps());
        this.hidden = !props.visible;
      },
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

export const CategorizationTester: RankedTester = rankWith(1, and(uiTypeIs('Categorization'), categorizationHasCategory));
