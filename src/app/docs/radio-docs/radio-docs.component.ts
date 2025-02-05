import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { JsonPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-radio-docs',
  templateUrl: './radio-docs.component.html',
  imports: [JsonFormsZorroModule, NzTableModule, JsonPipe, RouterLink],
})
export class RadioDocsComponent {
  renderers = ngZorroRenderers;
  data = { radio: 'Daily' };
  data1 = { button: 'Daily' };

  schema: JsonSchema = {
    type: 'object',
    properties: {
      radio: {
        type: 'string',
        enum: ['Never', 'Daily', 'Weekly', 'Monthly'],
      },
    },
  };

  uiSchema: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        label: 'Recurrence',
        type: 'Control',
        scope: '#/properties/radio',
        options: {
          format: 'radio',
        },
      },
    ],
  };

  schema1: JsonSchema = {
    type: 'object',
    properties: {
      button: {
        type: 'string',
        enum: ['Never', 'Daily', 'Weekly', 'Monthly'],
      },
    },
  };

  uiSchema1: JFZVerticalLayout = {
    type: 'VerticalLayout',
    elements: [
      {
        label: 'Recurrence',
        type: 'Control',
        scope: '#/properties/button',
        options: {
          format: 'radio-button',
        },
      },
    ],
  };
}
