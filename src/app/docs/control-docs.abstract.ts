import { Config, JFZVerticalLayout, JsonSchema, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';
import { Directive } from '@angular/core';

@Directive({})
export abstract class ControlDocsAbstract {
  renderers = ngZorroRenderers;

  dataObjects: Record<string, any> = {};
  schemaObjects: Record<string, JsonSchema> = {};
  uiSchemaObjects: Record<string, JFZVerticalLayout> = {};
  configObjects: Record<string, Config> = {};

  /**
   * @deprecated Use dataObjects instead
   */
  data = {};

  /**
   * @deprecated Use schemaObjects instead
   */
  abstract schema: JsonSchema;
  /**
   * @deprecated Use uiSchemaObjects instead
   */
  abstract uiSchema: JFZVerticalLayout;

  updateUiSchema(uiSchemaKey: string, $event: string): void {
    const cachedUiSchema = this.uiSchemaObjects[uiSchemaKey].elements[0];
    try {
      this.uiSchemaObjects[uiSchemaKey].elements[0] = null;
      this.uiSchemaObjects[uiSchemaKey].elements[0] = JSON.parse($event);
      this.dataObjects = { ...this.dataObjects }; // force rerender
    } catch (e) {
      this.uiSchemaObjects[uiSchemaKey].elements[0] = cachedUiSchema;
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

  /**
   * @deprecated Use updateSchema, updateData or updateUiSchema instead
   */
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
      const cachedSchema = this.schema;
      try {
        this.schema = null;
        this.schema = {
          ...cachedSchema,
          properties: JSON.parse($event),
        };
        this.data = { ...this.data }; // force rerender
      } catch (e) {
        this.schema = cachedSchema;
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
