import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { SelectRendererEditorComponent } from './select-renderer.editor.component';
import { JFZBuilderControl } from '../model';

@Component({
  imports: [SelectRendererEditorComponent],
  selector: 'radio-renderer-editor',
  template: `
    <select-renderer-editor [control]="control" (controlChange)="controlChange.emit($event)"></select-renderer-editor>
  `,
  styles: [':host {display: block;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RadioRendererEditorComponent {
  @Input() control: JFZBuilderControl;
  @Output() controlChange = new EventEmitter<JFZBuilderControl>();
}
