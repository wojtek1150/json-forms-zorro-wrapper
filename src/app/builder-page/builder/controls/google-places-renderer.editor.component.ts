import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { JFZBuilderControl } from '../model';

@Component({
  imports: [],
  selector: 'google-places-renderer-editor',
  template: `
    <h3>Google Places Options</h3>
    <p>Simplified editor for Google Places control. Full configuration available in future enhancement.</p>
  `,
  styles: [':host {display: block;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GooglePlacesRendererEditorComponent {
  @Input() control: JFZBuilderControl;
  @Output() controlChange = new EventEmitter<JFZBuilderControl>();
}
