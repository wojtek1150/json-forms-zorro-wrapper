import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { JFZBuilderLayout } from '../model';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import set from 'lodash-es/set';

@Component({
  imports: [NzInputModule, FormsModule],
  selector: 'group-layout-editor',
  template: `
    <h3>Group Layout Options</h3>
    <nz-input-group nzAddOnBefore="Description">
      <input
        nz-input
        [ngModel]="layout.uiSchema.description"
        (ngModelChange)="updateDescription($event)"
        placeholder="Group description"
      />
    </nz-input-group>
  `,
  styles: [':host {display: block;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupLayoutEditorComponent {
  @Input() layout: JFZBuilderLayout;
  @Output() layoutChange = new EventEmitter<JFZBuilderLayout>();

  updateDescription(description: string): void {
    set(this.layout, 'uiSchema.description', description || undefined);
    this.layoutChange.emit(this.layout);
  }
}
