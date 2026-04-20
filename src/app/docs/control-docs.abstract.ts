import { Config, JFZVerticalLayout, JsonSchema, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';
import { Directive } from '@angular/core';

@Directive({})
export abstract class ControlDocsAbstract {
  renderers = ngZorroRenderers;

  dataObjects: Record<string, any> = {};
  schemaObjects: Record<string, JsonSchema> = {};
  uiSchemaObjects: Record<string, JFZVerticalLayout> = {};
  configObjects: Record<string, Config> = {};

  updateUiSchema(uiSchemaKey: string, $event: string): void {
    const cachedUiSchema = this.uiSchemaObjects[uiSchemaKey];
    try {
      const parsed = JSON.parse($event);
      this.uiSchemaObjects[uiSchemaKey] = null;
      this.uiSchemaObjects[uiSchemaKey] =
        parsed && typeof parsed === 'object' && parsed.type && Array.isArray(parsed.elements) ? parsed : { ...cachedUiSchema, elements: [parsed] };
      this.dataObjects = { ...this.dataObjects }; // force rerender
    } catch (e) {
      this.uiSchemaObjects[uiSchemaKey] = cachedUiSchema;
    }
  }

  updateSchema(schemaKey: string, $event: string): void {
    const cachedSchema = this.schemaObjects[schemaKey];
    try {
      this.schemaObjects[schemaKey] = null;
      this.schemaObjects[schemaKey] = {
        ...cachedSchema,
        properties: JSON.parse($event),
      };
      this.dataObjects = { ...this.dataObjects }; // force rerender
    } catch (e) {
      this.schemaObjects[schemaKey] = cachedSchema;
    }
  }

  updateData(dataKey: string, $event: string): void {
    const cachedData = this.dataObjects[dataKey];
    try {
      this.dataObjects[dataKey] = null;
      this.dataObjects[dataKey] = JSON.parse($event);
    } catch (e) {
      this.dataObjects[dataKey] = cachedData;
    }
  }

  updateConfig(configKey: string, $event: string): void {
    const cachedConfig = this.configObjects[configKey];
    try {
      this.configObjects[configKey] = null;
      this.configObjects[configKey] = JSON.parse($event);
    } catch (e) {
      this.configObjects[configKey] = cachedConfig;
    }
  }
}
