import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { JFZBuilderLayout } from '../model';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import set from 'lodash-es/set';

@Component({
  imports: [NzInputModule, FormsModule],
  selector: 'array-layout-editor',
  template: `
    <h3>Array Layout Options</h3>
    <nz-input-group nzAddOnBefore="Description">
      <input
        nz-input
        [ngModel]="layout.uiSchema.description"
        (ngModelChange)="updateDescription($event)"
        placeholder="Array layout description"
      />
    </nz-input-group>
    <p class="info-text">Array layouts allow users to add multiple items. Configure the item template by adding controls to this layout.</p>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .info-text {
        margin-top: 12px;
        font-size: 12px;
        color: #8c8c8c;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrayLayoutEditorComponent {
  @Input() layout: JFZBuilderLayout;
  @Output() layoutChange = new EventEmitter<JFZBuilderLayout>();

  updateDescription(description: string): void {
    set(this.layout, 'uiSchema.description', description || undefined);
    this.layoutChange.emit(this.layout);
  }
}
