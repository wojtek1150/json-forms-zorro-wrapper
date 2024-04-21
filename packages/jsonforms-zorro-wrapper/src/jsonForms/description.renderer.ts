import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { JFZElement } from '../other/uischema';
import { JsonSchema } from '../core';

@Component({
  selector: 'DescriptionRenderer',
  template: `
    @if (description) {
      <div class="description">
        @if (!htmlDescription) {
          <p>{{ description }}</p>
        }
        @if (htmlDescription) {
          <div [innerHTML]="sanitizedDescription"></div>
        }
      </div>
    }
  `,
  styles: [
    `
      .description {
        font-size: var(--jfz-description-font-size, 0.75em);
        margin: 0.25em 0 0.5em;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class DescriptionRenderer<T extends JFZElement> {
  @Input() uiSchema: T;
  @Input() scopedSchema: JsonSchema;

  constructor(private sanitizer: DomSanitizer) {}

  get description(): string {
    return this.scopedSchema.description || this.uiSchema.description || '';
  }

  get htmlDescription(): boolean {
    return this.uiSchema.options?.html;
  }

  get sanitizedDescription(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.description);
  }
}
