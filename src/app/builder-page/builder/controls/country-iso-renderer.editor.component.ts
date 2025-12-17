import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { JFZBuilderControl } from '../model';

@Component({
  imports: [],
  selector: 'country-iso-renderer-editor',
  template: `
    <h3>Country ISO Options</h3>
    <p>Simplified editor for Country ISO control. Full configuration available in future enhancement.</p>
  `,
  styles: [':host {display: block;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryIsoRendererEditorComponent {
  @Input() control: JFZBuilderControl;
  @Output() controlChange = new EventEmitter<JFZBuilderControl>();
}
