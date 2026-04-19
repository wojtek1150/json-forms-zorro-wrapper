import { Component } from '@angular/core';
import { Config, JFZVerticalLayout, JsonFormsZorroModule, JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { ControlDocsAbstract } from '../control-docs.abstract';
import { EditorFormatterPipe } from '../../pipes/editor-formatter.pipe';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-mention-docs',
  templateUrl: './mention-docs.component.html',
  imports: [JsonFormsZorroModule, NzTableModule, EditorFormatterPipe, NzCodeEditorModule, FormsModule],
})
export class MentionDocsComponent extends ControlDocsAbstract {
  override dataObjects: Record<string, any> = {
    dataMention: {},
    dataMentionAll: {},
  };

  override schemaObjects: Record<string, JsonSchema> = {
    schemaMention: {
      type: 'object',
      properties: {
        mentionField: {
          type: 'array',
          minItems: 2,
          maxItems: 4,
          uniqueItems: true,
          items: {
            type: 'string',
            enum: ['foo'],
          },
        },
      },
    },
    schemaMentionAll: {
      type: 'object',
      properties: {
        mentionField: {
          type: 'array',
          uniqueItems: true,
          items: {
            type: 'string',
            enum: ['foo'],
          },
        },
      },
    },
  };

  override uiSchemaObjects: Record<string, JFZVerticalLayout> = {
    uiSchemaMention: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/mentionField',
          label: 'User selection',
          options: {
            format: 'mention',
            mentionKey: 'users',
            returnValueKey: 'email',
          },
        },
      ],
    },
    uiSchemaMentionAll: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/mentionField',
          label: 'User selection',
          options: {
            format: 'mention',
            mentionKey: 'users',
            returnValueKey: 'all',
          },
        },
      ],
    },
  };

  override configObjects: Record<string, Config> = {
    jsonformsConfigExternal: {
    mentionDictionary: {
      users: [
        {
          name: 'John Doe',
          email: 'john.doe@gmail.com',
          avatar: 'https://i.pravatar.cc/400?img=50',
        },
        {
          name: 'Jane Doe',
          email: 'jane.doe@gmail.com',
          avatar: 'https://i.pravatar.cc/400?img=51',
        },
        {
          name: 'Lucy Green',
          email: 'lucy.green@gmail.com',
        },
        {
          name: 'John Smith',
          email: 'smith@gmail.com',
          avatar: 'https://i.pravatar.cc/400?img=52',
        },
        ],
      },
    },
  };
}
