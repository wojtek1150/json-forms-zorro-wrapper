import { and, categorizationHasCategory, JsonFormsState, mapStateToLayoutProps, optionIs, RankedTester, rankWith, uiTypeIs } from '../core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DescriptionRenderer, JsonFormsAngularService, JsonFormsBaseRenderer, JsonFormsOutlet } from '../jsonForms';
import { Subject, takeUntil } from 'rxjs';
import { JFZCategoryLayout } from '../other/uischema';
import { NzStepComponent, NzStepsComponent } from 'ng-zorro-antd/steps';
import { NzButtonComponent } from 'ng-zorro-antd/button';

@Component({
  selector: 'jsonforms-stepper-layout',
  template: `
    <aside>
      @if (uischema.label) {
        <h2>{{ uischema.label }}</h2>
      }
      <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="schema"></DescriptionRenderer>
      <nz-steps [nzCurrent]="step" [nzDirection]="stepperDirection" nzSize="small" (nzIndexChange)="onIndexChange($event)">
        @for (category of uischema.elements; track category) {
          <nz-step [nzTitle]="category.label"></nz-step>
        }
      </nz-steps>
    </aside>
    <div class="step-content">
      @for (category of uischema.elements; track category; let index = $index) {
        @if (step === index) {
          @for (element of category.elements; track element) {
            <div>
              <jsonforms-outlet [uischema]="element" [path]="path" [schema]="schema"></jsonforms-outlet>
            </div>
          }
        }
      }
      @if (showButtons) {
        <div class="steps-action">
          <button nz-button nzType="default" [disabled]="step === 0" (click)="previous()">
            <span>{{ previousLabel }}</span>
          </button>
          @if (step < uischema.elements.length - 1) {
            <button nz-button nzType="default" (click)="next()">
              <span>{{ nextLabel }}</span>
            </button>
          }
          @if (step === uischema.elements.length - 1) {
            <button nz-button nzType="primary" (click)="submit()" [nzLoading]="submitLoading">
              <span>{{ submitLabel }}</span>
            </button>
          }
        </div>
      }
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
  imports: [DescriptionRenderer, NzStepsComponent, NzStepComponent, JsonFormsOutlet, NzButtonComponent],
  standalone: true,
})
export class StepperLayoutRenderer extends JsonFormsBaseRenderer<JFZCategoryLayout> implements OnInit, OnDestroy {
  showButtons = false;
  nextLabel = 'Next';
  previousLabel = 'Previous';
  submitLabel = 'Submit';
  submitLoading: boolean = false;
  step = 0;
  stepperDirection: 'horizontal' | 'vertical' = 'vertical';

  private readonly destroy$ = new Subject<void>();

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
        this.stepperDirection = uiSchemaOptions.stepperDirection || 'vertical';
        this.submitLoading = state.jsonforms.submitLoading;
      },
    });
    this.jsonFormsService.$stepChangeState.pipe(takeUntil(this.destroy$)).subscribe(({ step }) => (this.step = step));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onIndexChange(index: number): void {
    this.step = index;
    this.jsonFormsService.changeStep(this.step);
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
