import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { JsonPipe } from '@angular/common';
import { EditorFormatterPipe } from '../../pipes/editor-formatter.pipe';
import { NzCodeEditorComponent } from 'ng-zorro-antd/code-editor';
import { FormsModule } from '@angular/forms';
import { ControlDocsAbstract } from '../control-docs.abstract';

@Component({
  selector: 'app-wysiwyg-docs',
  templateUrl: './wysiwyg-docs.component.html',
  standalone: true,
  imports: [JsonFormsZorroModule, NzTableModule, JsonPipe, EditorFormatterPipe, NzCodeEditorComponent, FormsModule],
  styles: [
    `
      .flex {
        margin-top: 20px;
      }

      .flex pre {
        margin-bottom: 24px;
      }
    `,
  ],
})
export class WysiwygDocsComponent extends ControlDocsAbstract {
  override data = {
    comment: '<p>Enter comment here</p>',
  };

  schema: JsonSchema = {
    type: 'object',
    properties: {
      comment: {
        type: 'string',
      },
    },
  };

  uiSchema: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        label: 'Comment',
        type: 'Control',
        scope: '#/properties/comment',
        options: {
          wysiwyg: true,
          formats: ['bold', 'italic', 'underline', 'link', 'list'],
        },
      },
    ],
  };
}
