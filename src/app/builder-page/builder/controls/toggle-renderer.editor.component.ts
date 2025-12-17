import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { JFZBuilderControl } from '../model';

@Component({
  imports: [],
  selector: 'toggle-renderer-editor',
  template: `
    <h3>Toggle Options</h3>
    <p>No additional options available for toggle controls.</p>
  `,
  styles: [':host {display: block;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToggleRendererEditorComponent {
  @Input() control: JFZBuilderControl;
  @Output() controlChange = new EventEmitter<JFZBuilderControl>();
}
