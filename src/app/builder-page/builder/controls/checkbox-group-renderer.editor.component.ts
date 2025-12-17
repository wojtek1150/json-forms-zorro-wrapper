import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectRendererEditorComponent } from './select-renderer.editor.component';
import { JFZBuilderControl } from '../model';

@Component({
  imports: [SelectRendererEditorComponent],
  selector: 'checkbox-group-renderer-editor',
  template: `
    <h3>Checkbox Group Options</h3>
    <p>Configure the available options for the checkbox group:</p>
    <select-renderer-editor [control]="control" (controlChange)="controlChange.emit($event)"></select-renderer-editor>
  `,
  styles: [':host {display: block;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxGroupRendererEditorComponent {
  @Input() control: JFZBuilderControl;
  @Output() controlChange = new EventEmitter<JFZBuilderControl>();
}
