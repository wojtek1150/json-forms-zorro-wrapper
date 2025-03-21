import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-skeleton-docs',
  templateUrl: './skeleton-docs.component.html',
  imports: [JsonFormsZorroModule, NzTableModule, NzSwitchModule, FormsModule],
})
export class SkeletonDocsComponent {
  showSkeleton = false;
  renderers = ngZorroRenderers;

  schema: JsonSchema = {
    type: 'object',
    properties: {
      checkbox: {
        type: 'boolean',
      },
      dateRange: {
        type: 'array',
      },
      date: {
        type: 'string',
      },
      number: {
        type: 'number',
      },
      radio: {
        type: 'string',
        enum: ['Never', 'Daily', 'Weekly', 'Monthly'],
      },
      radioButton: {
        type: 'string',
        enum: ['Never', 'Daily', 'Weekly', 'Monthly'],
      },
      select: {
        type: 'string',
        enum: ['option1', 'option2', 'option3'],
      },
      text: {
        type: 'string',
      },
      textarea: {
        type: 'string',
      },
      toggle: {
        type: 'boolean',
      },
      wysiwyg: {
        type: 'string',
      },
      image: {
        type: 'string',
      },
    },
  };

  uiSchema: JFZVerticalLayout = {
    type: 'VerticalLayout',
    options: {
      submitLabel: 'Save form',
    },
    elements: [
      {
        type: 'Control',
        label: 'Checkbox',
        scope: '#/properties/checkbox',
      },
      {
        type: 'Control',
        scope: '#/properties/dateRange',
        label: 'DatePicker',
        options: {
          format: 'dateRange',
          dateFormat: 'yyyy-MM-dd HH:mm',
          saveFormat: "yyyy-MM-dd'T'HH:mm:ss",
          disablePastDates: true,
        },
      },
      {
        type: 'Control',
        scope: '#/properties/date',
        label: 'DatePicker',
        options: {
          format: 'date',
          dateFormat: 'yyyy-MM-dd HH:mm',
          saveFormat: "yyyy-MM-dd'T'HH:mm:ss",
          showTime: false,
          disablePastDates: true,
        },
      },
      {
        type: 'Control',
        label: 'Number',
        scope: '#/properties/number',
      },
      {
        label: 'Radio',
        type: 'Control',
        scope: '#/properties/radio',
        options: {
          format: 'radio',
        },
      },
      {
        type: 'Control',
        label: 'RadioButton',
        scope: '#/properties/radioButton',
        options: {
          format: 'radio-button',
        },
      },
      {
        type: 'Control',
        label: 'Select',
        scope: '#/properties/select',
      },
      {
        type: 'Control',
        label: 'Text',
        scope: '#/properties/text',
      },
      {
        type: 'Control',
        label: 'Textarea',
        scope: '#/properties/textarea',
        options: {
          multi: true,
          minRows: 3,
          maxRows: 5,
        },
      },
      {
        type: 'Control',
        label: 'Toggle',
        scope: '#/properties/toggle',
        options: {
          toggle: true,
        },
      },
      {
        label: 'Wysiwyg',
        type: 'Control',
        scope: '#/properties/wysiwyg',
        options: {
          wysiwyg: true,
          formats: ['bold', 'italic', 'underline', 'link', 'list'],
        },
      },
      {
        label: 'Image control label',
        type: 'Control',
        scope: '#/properties/image',
        options: {
          format: 'image',
          hint: 'You can upload JPG, PNG or GIF file',
          uploadUrl: 'https://mocky.io/v3/0d4e05cd-4ce6-4061-a736-9d48a4869a9e',
          deleteUrl: 'https://mocky.io/v3/0d4e05cd-4ce6-4061-a736-9d48a4869a9e',
          maxImageWidth: 600,
          maxImageHeight: 600,
          maxImageSizeMB: 1,
        },
      },
    ],
  };
}
