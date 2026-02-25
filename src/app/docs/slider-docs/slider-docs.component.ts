import { Component } from '@angular/core';
import { JFZVerticalLayout, JsonFormsZorroModule, JsonSchema } from '@wojtek1150/jsonforms-zorro-wrapper';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { FormsModule } from '@angular/forms';
import { EditorFormatterPipe } from '../../pipes/editor-formatter.pipe';
import { ControlDocsAbstract } from '../control-docs.abstract';

@Component({
  selector: 'app-slider-docs',
  templateUrl: './slider-docs.component.html',
  imports: [JsonFormsZorroModule, NzTableModule, NzCodeEditorModule, FormsModule, EditorFormatterPipe],
})
export class SliderDocsComponent extends ControlDocsAbstract {
  schema = null;
  uiSchema = null;

  override dataObjects: Record<string, any> = {
    dataSlider: {},
  };

  override schemaObjects: Record<string, JsonSchema> = {
    schemaSlider: {
      type: 'object',
      properties: {
        slider: {
          type: 'number',
          minimum: 1,
          maximum: 10,
        },
      },
    },
  };

  override uiSchemaObjects: Record<string, JFZVerticalLayout> = {
    uiSchemaSlider: {
      type: 'VerticalLayout',
      elements: [
        {
          type: 'Control',
          scope: '#/properties/slider',
          label: 'Slider',
          options: {
            slider: true,
          },
        },
      ],
    },
  };
}
