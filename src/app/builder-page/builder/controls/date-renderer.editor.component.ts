import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { JFZBuilderControl } from '../model';
import set from 'lodash-es/set';

@Component({
  imports: [NzSelectModule, NzInputModule, FormsModule],
  selector: 'date-renderer-editor',
  template: `
    <h3>Date Options</h3>
    <nz-input-group nzAddOnBefore="Format">
      <nz-select
        [ngModel]="control.formSchema.format || 'date'"
        (ngModelChange)="updateFormat($event)"
        nzPlaceHolder="Select format"
      >
        <nz-option nzValue="date" nzLabel="Date"></nz-option>
        <nz-option nzValue="date-time" nzLabel="Date Time"></nz-option>
        <nz-option nzValue="time" nzLabel="Time"></nz-option>
      </nz-select>
    </nz-input-group>
  `,
  styles: [':host {display: block;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateRendererEditorComponent {
  @Input() control: JFZBuilderControl;
  @Output() controlChange = new EventEmitter<JFZBuilderControl>();

  updateFormat(format: string): void {
    set(this.control, 'formSchema.format', format);
    this.controlChange.emit(this.control);
  }
}
