import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { JFZBuilderControl } from '../model';

@Component({
  imports: [],
  selector: 'mention-renderer-editor',
  template: `
    <h3>Mention Options</h3>
    <p>Simplified editor for mention control. Full configuration available in future enhancement.</p>
  `,
  styles: [':host {display: block;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MentionRendererEditorComponent {
  @Input() control: JFZBuilderControl;
  @Output() controlChange = new EventEmitter<JFZBuilderControl>();
}
