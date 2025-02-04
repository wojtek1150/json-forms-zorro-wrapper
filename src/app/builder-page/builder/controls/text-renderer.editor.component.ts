import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { JFZBuilderControl } from '../model';
import { BuilderService } from '../builder.service';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

import set from 'lodash-es/set';

@Component({
  imports: [NzInputModule, FormsModule, NzInputNumberModule, NzCheckboxModule],
  selector: 'text-renderer-editor',
  template: `
    <h3>Additional options</h3>
    <label nz-checkbox [ngModel]="control.uiSchema.options?.multi" (ngModelChange)="textarea($event)">As textarea</label>
    @if (control.uiSchema.options?.multi) {
      <nz-input-group nzAddOnBefore="Min Rows">
        <nz-input-number
          [nzMin]="0"
          [nzStep]="1"
          [ngModel]="control.uiSchema.options?.minRows || 0"
          (ngModelChange)="updateOption('minRows', $event)"
        ></nz-input-number>
      </nz-input-group>
      <nz-input-group nzAddOnBefore="Max Rows">
        <nz-input-number
          [nzMin]="0"
          [nzStep]="1"
          [ngModel]="control.uiSchema.options?.maxRows || 0"
          (ngModelChange)="updateOption('maxRows', $event)"
        ></nz-input-number>
      </nz-input-group>
    }
    `,
  styles: [':host {display: block;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextRendererEditorComponent {
  @Input() control: JFZBuilderControl;
  @Output() controlChange = new EventEmitter<JFZBuilderControl>();

  constructor(public service: BuilderService) {}

  updateOption(label: string, value: number): void {
    set(this.control, `uiSchema.options.${label}`, value);
    this.controlChange.emit(this.control);
  }

  textarea($event: boolean): void {
    const options = $event ? { multi: true, minRows: 2, maxRows: 4 } : {};
    set(this.control, 'uiSchema.options', options);
    this.controlChange.emit(this.control);
  }
}
