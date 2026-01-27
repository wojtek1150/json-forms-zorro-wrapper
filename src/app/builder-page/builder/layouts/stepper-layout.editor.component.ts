import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { JFZBuilderLayout } from '../model';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import set from 'lodash-es/set';

@Component({
  imports: [NzInputModule, FormsModule, NzButtonModule, NzIconModule],
  selector: 'stepper-layout-editor',
  template: `
    <h3>Stepper Layout Options</h3>
    <nz-input-group nzAddOnBefore="Next Label">
      <input
        nz-input
        [ngModel]="layout.uiSchema.options?.nextLabel || 'Next'"
        (ngModelChange)="updateOption('nextLabel', $event)"
        placeholder="Next button label"
      />
    </nz-input-group>
    <nz-input-group nzAddOnBefore="Previous Label">
      <input
        nz-input
        [ngModel]="layout.uiSchema.options?.previousLabel || 'Previous'"
        (ngModelChange)="updateOption('previousLabel', $event)"
        placeholder="Previous button label"
      />
    </nz-input-group>
    <div class="steps-section">
      <h4>Steps</h4>
      @for (step of steps; track $index; let i = $index) {
        <div class="step-item">
          <nz-input-group>
            <input
              nz-input
              [ngModel]="step.label"
              (ngModelChange)="updateStepLabel(i, $event)"
              placeholder="Step label"
            />
            <button nz-button nzType="text" nzDanger (click)="removeStep(i)">
              <nz-icon nzType="delete" nzTheme="outline"></nz-icon>
            </button>
          </nz-input-group>
        </div>
      }
      <button nz-button nzType="dashed" (click)="addStep()" style="width: 100%; margin-top: 8px;">
        <nz-icon nzType="plus" nzTheme="outline"></nz-icon>
        Add Step
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .steps-section {
        margin-top: 16px;
      }

      .step-item {
        display: flex;
        gap: 8px;
        margin-bottom: 8px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StepperLayoutEditorComponent {
  @Input() layout: JFZBuilderLayout;
  @Output() layoutChange = new EventEmitter<JFZBuilderLayout>();

  get steps(): any[] {
    return (this.layout.uiSchema as any).elements || [];
  }

  addStep(): void {
    const newSteps = [...this.steps, { type: 'Category', label: `Step ${this.steps.length + 1}`, elements: [] }];
    set(this.layout, 'uiSchema.elements', newSteps);
    this.layoutChange.emit(this.layout);
  }

  updateStepLabel(index: number, label: string): void {
    const newSteps = [...this.steps];
    newSteps[index] = { ...newSteps[index], label };
    set(this.layout, 'uiSchema.elements', newSteps);
    this.layoutChange.emit(this.layout);
  }

  removeStep(index: number): void {
    const newSteps = this.steps.filter((_, i) => i !== index);
    set(this.layout, 'uiSchema.elements', newSteps);
    this.layoutChange.emit(this.layout);
  }

  updateOption(property: string, value: string): void {
    const options = { ...(this.layout.uiSchema.options || {}), [property]: value };
    set(this.layout, 'uiSchema.options', options);
    this.layoutChange.emit(this.layout);
  }
}
