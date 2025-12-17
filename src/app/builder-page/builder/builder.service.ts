import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as createId } from 'uuid';
import {
  JFZBuilderControl,
  JFZBuilderLayout,
  JFZBuilderItem,
  jfzBuilderControls,
  jfzBuilderLayouts,
  JFZBuilderInputType,
  JFZBuilderLayoutType,
} from './model';
import { JFZVerticalLayout, JsonSchema, JFZLayout, JFZControlElement } from '@wojtek1150/jsonforms-zorro-wrapper';

interface HistoryState {
  rootElements: JFZBuilderItem[];
  timestamp: number;
}

@Injectable({ providedIn: 'root' })
export class BuilderService {
  // Source items (templates) - filter out disabled controls
  copyFromControls: JFZBuilderControl[] = jfzBuilderControls.filter(c => !c.disabled);
  copyFromLayouts: JFZBuilderLayout[] = [...jfzBuilderLayouts];
  
  // Dropped items (root level)
  rootElements: JFZBuilderItem[] = [];

  // Observables
  private _rootElements$ = new BehaviorSubject<JFZBuilderItem[]>([]);
  rootElements$ = this._rootElements$.asObservable();

  private _uiSchema$ = new BehaviorSubject<JFZVerticalLayout>({ elements: [], type: 'VerticalLayout' });
  uiSchema$ = this._uiSchema$.asObservable();

  private _formSchema$ = new BehaviorSubject<JsonSchema>({ type: 'object', properties: {} });
  formSchema$ = this._formSchema$.asObservable();

  // Undo/Redo
  private history: HistoryState[] = [];
  private historyIndex: number = -1;
  private readonly MAX_HISTORY_SIZE = 50;
  
  private _canUndo$ = new BehaviorSubject<boolean>(false);
  canUndo$ = this._canUndo$.asObservable();
  
  private _canRedo$ = new BehaviorSubject<boolean>(false);
  canRedo$ = this._canRedo$.asObservable();

  constructor() {
    this.saveHistory();
  }

  // ==================== DRAG & DROP ====================

  handleDropEvent(event: CdkDragDrop<JFZBuilderItem[]>, targetLayoutKey?: string): JFZBuilderItem | undefined {
    this.cleanupTemporaryItems();
    const { data } = event.item;
    
    try {
      if (event.previousContainer === event.container) {
        // Reordering within same container
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        this.saveHistory();
        this.updateSchemas();
        return data;
      } else {
        // Dropping from source to target
        const item = this.createInstance(data, targetLayoutKey);
        const targetArray = targetLayoutKey 
          ? this.findLayoutElements(targetLayoutKey) 
          : this.rootElements;
        
        targetArray.splice(event.currentIndex, 0, item);
        this.saveHistory();
        this.updateSchemas();
        // Force update for nested layouts
        if (targetLayoutKey) {
          this._rootElements$.next(JSON.parse(JSON.stringify(this.rootElements)));
        }
        return item;
      }
    } catch (error) {
      console.error('Error handling drop event:', error);
      return undefined;
    }
  }

  private createInstance(item: JFZBuilderItem, parentLayoutKey?: string): JFZBuilderItem {
    const key = createId().replace(/-/g, '');
    
    if (this.isControl(item)) {
      return this.createControlInstance(item, key, parentLayoutKey);
    } else {
      return this.createLayoutInstance(item, key);
    }
  }

  private createControlInstance(template: JFZBuilderControl, key: string, parentLayoutKey?: string): JFZBuilderControl {
    const uniqueName = this.generateUniqueFieldName(template.name);
    const scope = `#/properties/${uniqueName}`;
    
    return {
      ...template,
      key,
      name: uniqueName,
      temp: false,
      editor: false,
      uiSchema: {
        ...template.uiSchema,
        scope,
      },
    };
  }

  private createLayoutInstance(template: JFZBuilderLayout, key: string): JFZBuilderLayout {
    return {
      ...template,
      key,
      temp: false,
      editor: false,
      elements: [],
      uiSchema: {
        ...template.uiSchema,
        elements: [],
      },
    };
  }

  private generateUniqueFieldName(baseName: string): string {
    let counter = 1;
    let name = baseName;
    
    while (this.fieldNameExists(name)) {
      name = `${baseName}${counter}`;
      counter++;
    }
    
    return name;
  }

  private fieldNameExists(name: string): boolean {
    return this.getAllControls().some(control => control.name === name);
  }

  private getAllControls(): JFZBuilderControl[] {
    const controls: JFZBuilderControl[] = [];
    
    const traverse = (items: JFZBuilderItem[]) => {
      items.forEach(item => {
        if (this.isControl(item)) {
          controls.push(item);
        } else if (this.isLayout(item)) {
          traverse(item.elements);
        }
      });
    };
    
    traverse(this.rootElements);
    return controls;
  }

  // ==================== ITEM MANAGEMENT ====================

  addItem(item: JFZBuilderItem, targetLayoutKey?: string): void {
    const instance = this.createInstance(item, targetLayoutKey);
    const targetArray = targetLayoutKey 
      ? this.findLayoutElements(targetLayoutKey) 
      : this.rootElements;
    
    targetArray.push(instance);
    this.saveHistory();
    this.updateSchemas();
  }

  removeItem(key: string, parentLayoutKey?: string): void {
    const targetArray = parentLayoutKey 
      ? this.findLayoutElements(parentLayoutKey) 
      : this.rootElements;
    
    const index = targetArray.findIndex(item => item.key === key);
    if (index !== -1) {
      targetArray.splice(index, 1);
      this.saveHistory();
      this.updateSchemas();
    }
  }

  updateItem(key: string, updates: Partial<JFZBuilderItem>, parentLayoutKey?: string): void {
    const targetArray = parentLayoutKey 
      ? this.findLayoutElements(parentLayoutKey) 
      : this.rootElements;
    
    const item = targetArray.find(item => item.key === key);
    if (item) {
      Object.assign(item, updates);
      
      // If name changed, update scope for controls
      if (this.isControl(item) && 'name' in updates && updates.name && updates.name !== item.name) {
        item.uiSchema.scope = `#/properties/${updates.name}`;
      }
      
      this.saveHistory();
      this.updateSchemas();
    }
  }

  findItem(key: string): JFZBuilderItem | null {
    const traverse = (items: JFZBuilderItem[]): JFZBuilderItem | null => {
      for (const item of items) {
        if (item.key === key) {
          return item;
        }
        if (this.isLayout(item)) {
          const found = traverse(item.elements);
          if (found) return found;
        }
      }
      return null;
    };
    
    return traverse(this.rootElements);
  }

  findLayoutElements(layoutKey: string): JFZBuilderItem[] {
    const layout = this.findItem(layoutKey);
    if (this.isLayout(layout)) {
      return layout.elements;
    }
    return [];
  }

  // ==================== TEMPORARY ITEMS (DND HACK) ====================

  cleanupTemporaryItems(): void {
    this.copyFromControls = this.copyFromControls.filter(it => !it.temp);
    this.copyFromLayouts = this.copyFromLayouts.filter(it => !it.temp);
  }

  addTemporaryItem(data: JFZBuilderItem): void {
    if (this.isControl(data)) {
      const index = this.copyFromControls.findIndex(it => it === data);
      if (index !== -1) {
        this.copyFromControls.splice(index + 1, 0, { ...data, temp: true });
      }
    } else if (this.isLayout(data)) {
      const index = this.copyFromLayouts.findIndex(it => it === data);
      if (index !== -1) {
        this.copyFromLayouts.splice(index + 1, 0, { ...data, temp: true });
      }
    }
  }

  // ==================== TYPE GUARDS ====================

  isControl(item: JFZBuilderItem | null): item is JFZBuilderControl {
    return item !== null && 'type' in item && Object.values(JFZBuilderInputType).includes(item.type as JFZBuilderInputType);
  }

  isLayout(item: JFZBuilderItem | null): item is JFZBuilderLayout {
    return item !== null && 'type' in item && Object.values(JFZBuilderLayoutType).includes(item.type as JFZBuilderLayoutType);
  }

  // ==================== SCHEMA GENERATION ====================

  private updateSchemas(): void {
    this._rootElements$.next(JSON.parse(JSON.stringify(this.rootElements)));
    this.toUiSchema();
    this.toFormSchema();
  }

  private toUiSchema(): void {
    const elements: any = this.rootElements.map(item => this.itemToUiSchemaElement(item));
    this._uiSchema$.next({ type: 'VerticalLayout', elements } as JFZVerticalLayout);
  }

  private itemToUiSchemaElement(item: JFZBuilderItem): JFZControlElement | JFZLayout {
    if (this.isControl(item)) {
      return item.uiSchema;
    } else if (this.isLayout(item)) {
      const layoutSchema: any = { ...item.uiSchema };
      // JSON Forms supports mixed arrays of controls and layouts, but TypeScript types don't reflect this
      const elements: any = item.elements.map(elem => this.itemToUiSchemaElement(elem));
      layoutSchema.elements = elements;
      return layoutSchema as JFZLayout;
    }
    throw new Error('Unknown item type');
  }

  private toFormSchema(): void {
    const properties: Record<string, any> = {};
    
    const traverse = (items: JFZBuilderItem[], parentPath: string = '') => {
      items.forEach(item => {
        if (this.isControl(item)) {
          const fullPath = parentPath ? `${parentPath}.${item.name}` : item.name;
          properties[fullPath] = item.formSchema;
        } else if (this.isLayout(item)) {
          traverse(item.elements, parentPath);
        }
      });
    };
    
    traverse(this.rootElements);
    
    // Flatten nested properties to root level for JSON Forms
    const flattenedProperties: Record<string, any> = {};
    Object.keys(properties).forEach(key => {
      const parts = key.split('.');
      const rootKey = parts[0];
      if (parts.length === 1) {
        flattenedProperties[rootKey] = properties[key];
      } else {
        // For nested properties, keep them at root level (JSON Forms handles nesting via scope)
        flattenedProperties[rootKey] = properties[key];
      }
    });
    
    this._formSchema$.next({ type: 'object', properties: flattenedProperties });
  }

  // ==================== UNDO/REDO ====================

  undo(): void {
    if (this.canUndo()) {
      this.historyIndex--;
      this.restoreState(this.history[this.historyIndex]);
      this.updateUndoRedoState();
    }
  }

  redo(): void {
    if (this.canRedo()) {
      this.historyIndex++;
      this.restoreState(this.history[this.historyIndex]);
      this.updateUndoRedoState();
    }
  }

  canUndo(): boolean {
    return this.historyIndex > 0;
  }

  canRedo(): boolean {
    return this.historyIndex < this.history.length - 1;
  }

  private saveHistory(): void {
    // Remove any future history if we're not at the end
    if (this.historyIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.historyIndex + 1);
    }
    
    const state: HistoryState = {
      rootElements: JSON.parse(JSON.stringify(this.rootElements)),
      timestamp: Date.now(),
    };
    
    this.history.push(state);
    
    // Limit history size
    if (this.history.length > this.MAX_HISTORY_SIZE) {
      this.history.shift();
    } else {
      this.historyIndex++;
    }
    
    this.updateUndoRedoState();
  }

  private restoreState(state: HistoryState): void {
    this.rootElements = JSON.parse(JSON.stringify(state.rootElements));
    this.updateSchemas();
  }

  private updateUndoRedoState(): void {
    this._canUndo$.next(this.canUndo());
    this._canRedo$.next(this.canRedo());
  }

  // ==================== LEGACY SUPPORT ====================

  // For backward compatibility
  get copyFromInputs(): JFZBuilderControl[] {
    return this.copyFromControls;
  }

  get dropInputs(): JFZBuilderControl[] {
    return this.rootElements.filter(item => this.isControl(item)) as JFZBuilderControl[];
  }

  get fields$() {
    return this.rootElements$;
  }

  updateControlData(key: string, data: JFZBuilderControl | null): void {
    if (!data) {
      this.removeItem(key);
    } else {
      this.updateItem(key, data);
    }
  }

  updateFormLabel(config: JFZBuilderControl, label: string): void {
    this.updateItem(config.key!, { uiSchema: { ...config.uiSchema, label } });
  }
}
