import { and, Categorization, categorizationHasCategory, JsonFormsState, mapStateToLayoutProps, optionIs, RankedTester, rankWith, uiTypeIs } from '@jsonforms/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { JsonFormsAngularService, JsonFormsBaseRenderer } from '@jsonforms/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'jsonforms-stepper-layout',
  template: `
    <nz-steps [nzCurrent]="step" nzDirection="vertical" nzSize="small" (nzIndexChange)="onIndexChange($event)">
      <nz-step
        *ngFor="let category of uischema.elements;"
        [nzTitle]="category.label"
      ></nz-step>
    </nz-steps>
    <div class="step-content">
      <ng-container *ngFor="let category of uischema.elements; let index = index">
        <ng-container *ngIf="step === index">
          <div *ngFor="let element of category.elements">
            <jsonforms-outlet [uischema]="element" [path]="path" [schema]="schema"></jsonforms-outlet>
          </div>
        </ng-container>
      </ng-container>
    </div>
  `,
  styles: [`
    :host {
      display: flex;
    }

    nz-steps {
      flex: 1;
    }

    .step-content {
      flex: 1;
      min-width: 80%;
    }
  `],
})
export class StepperLayoutRenderer extends JsonFormsBaseRenderer<Categorization> implements OnInit, OnDestroy {
  showButtons = false;
  step = 0;

  private subscription: Subscription;

  constructor(private jsonFormsService: JsonFormsAngularService) {
    super();
  }

  ngOnInit() {
    this.subscription = this.jsonFormsService.$state.subscribe({
      next: (state: JsonFormsState) => {
        const props = mapStateToLayoutProps(state, this.getOwnProps());
        const uiSchemaOptions = props.uischema.options;
        if (uiSchemaOptions['showNavButtons']) {
          this.showButtons = true;
        }
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onIndexChange(index: number): void {
    if (!this.showButtons) {
      this.step = index;
    }
  }
}

export const StepperTester: RankedTester = rankWith(
  2,
  and(uiTypeIs('Categorization'), categorizationHasCategory, optionIs('variant', 'stepper'))
);
