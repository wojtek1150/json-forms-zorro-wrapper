import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { JFZBuilderControl } from '../model';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import set from 'lodash-es/set';

@Component({
  imports: [NzInputModule, FormsModule, NzInputNumberModule],
  selector: 'number-renderer-editor',
  template: `
    <h3>Number Options</h3>
    <nz-input-group nzAddOnBefore="Minimum">
      <nz-input-number
        [nzMin]="undefined"
        [nzStep]="1"
        [ngModel]="control.formSchema.minimum"
        (ngModelChange)="updateSchema('minimum', $event)"
      ></nz-input-number>
    </nz-input-group>
    <nz-input-group nzAddOnBefore="Maximum">
      <nz-input-number
        [nzMin]="undefined"
        [nzStep]="1"
        [ngModel]="control.formSchema.maximum"
        (ngModelChange)="updateSchema('maximum', $event)"
      ></nz-input-number>
    </nz-input-group>
    <nz-input-group nzAddOnBefore="Step">
      <nz-input-number
        [nzMin]="0.01"
        [nzStep]="0.01"
        [ngModel]="control.formSchema.multipleOf || 1"
        (ngModelChange)="updateSchema('multipleOf', $event)"
      ></nz-input-number>
    </nz-input-group>
  `,
  styles: [':host {display: block;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberRendererEditorComponent {
  @Input() control: JFZBuilderControl;
  @Output() controlChange = new EventEmitter<JFZBuilderControl>();

  updateSchema(property: string, value: number | undefined): void {
    if (value === null || value === undefined) {
      const schema = { ...this.control.formSchema };
      delete schema[property];
      this.control.formSchema = schema;
    } else {
      set(this.control, `formSchema.${property}`, value);
    }
    this.controlChange.emit(this.control);
  }
}
