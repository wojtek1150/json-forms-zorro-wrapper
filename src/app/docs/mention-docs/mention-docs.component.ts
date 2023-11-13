import { Component } from '@angular/core';
import { Config, JFZVerticalLayout, JsonSchema, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';

@Component({
  selector: 'app-mention-docs',
  templateUrl: './mention-docs.component.html',
})
export class MentionDocsComponent {
  renderers = ngZorroRenderers;
  data = {};
  data2 = {};
  jsonformsConfigExternal: Config = {
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
  };

  schema: JsonSchema = {
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
  };

  uiSchema: JFZVerticalLayout = {
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
  };

  schema2: JsonSchema = {
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
  };

  uiSchema2: JFZVerticalLayout = {
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
  };
}
