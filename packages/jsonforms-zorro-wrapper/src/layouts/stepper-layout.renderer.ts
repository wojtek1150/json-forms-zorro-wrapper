import { and, categorizationHasCategory, JsonFormsState, mapStateToLayoutProps, optionIs, RankedTester, rankWith, uiTypeIs } from '@jsonforms/core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { JsonFormsAngularService, JsonFormsBaseRenderer } from '../jsonForms';
import { Subject, takeUntil } from 'rxjs';
import { JFZCategoryLayout } from '../other/uischema';

@Component({
  selector: 'jsonforms-stepper-layout',
  template: `
    <aside>
      <h2 *ngIf="uischema.label">{{ uischema.label }}</h2>
      <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="schema"></DescriptionRenderer>
      <nz-steps [nzCurrent]="step" nzDirection="vertical" nzSize="small" (nzIndexChange)="onIndexChange($event)">
        <nz-step *ngFor="let category of uischema.elements" [nzTitle]="category.label"></nz-step>
      </nz-steps>
    </aside>
    <div class="step-content">
      <ng-container *ngFor="let category of uischema.elements; let index = index">
        <ng-container *ngIf="step === index">
          <div *ngFor="let element of category.elements">
            <jsonforms-outlet [uischema]="element" [path]="path" [schema]="schema"></jsonforms-outlet>
          </div>
        </ng-container>
      </ng-container>
      <div class="steps-action" *ngIf="showButtons">
        <button nz-button nzType="default" [disabled]="step === 0" (click)="previous()">
          <span>{{ previousLabel }}</span>
        </button>
        <button nz-button nzType="default" *ngIf="step < uischema.elements.length - 1" (click)="next()">
          <span>{{ nextLabel }}</span>
        </button>
        <button nz-button nzType="primary" *ngIf="step === uischema.elements.length - 1" (click)="submit()">
          <span>{{ submitLabel }}</span>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
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

      .steps-action {
        text-align: right;
      }

      .steps-action button:first-child {
        margin-right: 8px;
      }
    `,
  ],
})
export class StepperLayoutRenderer extends JsonFormsBaseRenderer<JFZCategoryLayout> implements OnInit, OnDestroy {
  showButtons = false;
  nextLabel = 'Next';
  previousLabel = 'Previous';
  submitLabel = 'Submit';
  step = 0;

  private destroy$ = new Subject();

  constructor(private jsonFormsService: JsonFormsAngularService) {
    super();
  }

  ngOnInit() {
    this.jsonFormsService.$state.pipe(takeUntil(this.destroy$)).subscribe({
      next: (state: JsonFormsState) => {
        const props = mapStateToLayoutProps(state, this.getOwnProps());
        const uiSchemaOptions = props.uischema.options;
        if (uiSchemaOptions.showNavButtons) {
          this.showButtons = true;
        }
        this.nextLabel = uiSchemaOptions.nextLabel || 'Next';
        this.previousLabel = uiSchemaOptions.previousLabel || 'Previous';
        this.submitLabel = uiSchemaOptions.submitLabel || 'Submit';
      },
    });
    this.jsonFormsService.$stepChangeState.pipe(takeUntil(this.destroy$)).subscribe(({ step }) => (this.step = step));
  }

  ngOnDestroy() {
    this.destroy$.complete();
  }

  onIndexChange(index: number): void {
    this.jsonFormsService.changeStep(this.step);
    this.step = index;
  }

  previous() {
    this.onIndexChange(this.step - 1);
  }

  next() {
    this.onIndexChange(this.step + 1);
  }

  submit() {
    this.jsonFormsService.submitForm();
  }
}

export const StepperTester: RankedTester = rankWith(2, and(uiTypeIs('Categorization'), categorizationHasCategory, optionIs('variant', 'stepper')));
