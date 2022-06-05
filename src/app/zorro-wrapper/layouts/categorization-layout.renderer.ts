import { and, Categorization, categorizationHasCategory, JsonFormsState, mapStateToLayoutProps, RankedTester, rankWith, uiTypeIs } from '@jsonforms/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { JsonFormsAngularService, JsonFormsBaseRenderer } from '@jsonforms/angular';
import { Subscription } from 'rxjs';

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
export class CategorizationTabLayoutRenderer extends JsonFormsBaseRenderer<Categorization> implements OnInit, OnDestroy {
  hidden: boolean;
  private subscription: Subscription;

  constructor(private jsonFormsService: JsonFormsAngularService) {
    super();
  }

  ngOnInit() {
    this.subscription = this.jsonFormsService.$state.subscribe({
      next: (state: JsonFormsState) => {
        const props = mapStateToLayoutProps(state, this.getOwnProps());
        this.hidden = !props.visible;
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}

export const CategorizationTester: RankedTester = rankWith(
  2,
  and(uiTypeIs('Categorization'), categorizationHasCategory)
);
