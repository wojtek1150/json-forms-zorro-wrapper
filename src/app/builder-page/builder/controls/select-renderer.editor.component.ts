import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { JFZBuilderControl } from '../model';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

import set from 'lodash-es/set';

@Component({
  imports: [NzInputModule, FormsModule, NzButtonModule, NzIconModule],
  selector: 'select-renderer-editor',
  template: `
    <h3>Select Options</h3>
    <div class="options-list">
      @for (option of options; track $index; let i = $index) {
        <div class="option-item">
          <nz-input-group>
            <input
              nz-input
              [ngModel]="option"
              (ngModelChange)="updateOption(i, $event)"
              placeholder="Option value"
            />
            <button nz-button nzType="text" nzDanger (click)="removeOption(i)">
              <nz-icon nzType="delete" nzTheme="outline"></nz-icon>
            </button>
          </nz-input-group>
        </div>
      }
      <button nz-button nzType="dashed" (click)="addOption()" style="width: 100%; margin-top: 8px;">
        <nz-icon nzType="plus" nzTheme="outline"></nz-icon>
        Add Option
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .options-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .option-item {
        display: flex;
        gap: 8px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectRendererEditorComponent {
  @Input() control: JFZBuilderControl;
  @Output() controlChange = new EventEmitter<JFZBuilderControl>();

  get options(): string[] {
    return this.control.formSchema.enum || [];
  }

  addOption(): void {
    const newOptions = [...this.options, `Option ${this.options.length + 1}`];
    set(this.control, 'formSchema.enum', newOptions);
    this.controlChange.emit(this.control);
  }

  updateOption(index: number, value: string): void {
    const newOptions = [...this.options];
    newOptions[index] = value;
    set(this.control, 'formSchema.enum', newOptions);
    this.controlChange.emit(this.control);
  }

  removeOption(index: number): void {
    const newOptions = this.options.filter((_, i) => i !== index);
    set(this.control, 'formSchema.enum', newOptions);
    this.controlChange.emit(this.control);
  }
}
