import { JFZVerticalLayout, JsonSchema, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';
import { Directive } from '@angular/core';

@Directive({})
export abstract class ControlDocsAbstract {
  renderers = ngZorroRenderers;
  data = {};
  abstract schema: JsonSchema;
  abstract uiSchema: JFZVerticalLayout;

  updateProperty(schemaToUpdate: string, $event: string): void {
    if (schemaToUpdate === 'data') {
      const cachedData = this.data;
      try {
        this.data = null;
        this.data = JSON.parse($event);
      } catch (e) {
        this.data = cachedData;
      }
    } else if (schemaToUpdate === 'schema') {
      const cachedSchema = this.schema.properties;
      try {
        this.schema.properties = null;
        this.schema.properties = JSON.parse($event);
        this.data = { ...this.data }; // force rerender
      } catch (e) {
        this.schema.properties = cachedSchema;
      }
    } else {
      const cachedUiSchema = this.uiSchema.elements[0];
      try {
        this.uiSchema.elements[0] = null;
        this.uiSchema.elements[0] = JSON.parse($event);
        this.data = { ...this.data }; // force rerender
      } catch (e) {
        this.uiSchema.elements[0] = cachedUiSchema;
      }
    }
  }
}
