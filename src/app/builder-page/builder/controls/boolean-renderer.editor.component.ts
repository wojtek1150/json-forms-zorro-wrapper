import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { JFZBuilderControl } from '../model';

@Component({
  imports: [],
  selector: 'boolean-renderer-editor',
  template: `
    <h3>Boolean Options</h3>
    <p>No additional options available for boolean controls.</p>
  `,
  styles: [':host {display: block;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BooleanRendererEditorComponent {
  @Input() control: JFZBuilderControl;
  @Output() controlChange = new EventEmitter<JFZBuilderControl>();
}
