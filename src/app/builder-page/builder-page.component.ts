import { Component } from '@angular/core';
import { BuilderService } from './builder/builder.service';
import { JFZBuilderControl, JFZBuilderLayout, JFZBuilderItem, JFZBuilderInputType, JFZBuilderLayoutType } from './builder/model';
import { JsonFormsZorroModule, ngZorroRenderers } from '@wojtek1150/jsonforms-zorro-wrapper';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ListInputSourceComponent } from './builder/list-input-source.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ListInputTargetComponent } from './builder/list-input-target.component';
import { AsyncPipe, JsonPipe, TitleCasePipe } from '@angular/common';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTabsModule } from 'ng-zorro-antd/tabs';

// Control Editors
import { TextRendererEditorComponent } from './builder/controls/text-renderer.editor.component';
import { TextareaRendererEditorComponent } from './builder/controls/textarea-renderer.editor.component';
import { NumberRendererEditorComponent } from './builder/controls/number-renderer.editor.component';
import { BooleanRendererEditorComponent } from './builder/controls/boolean-renderer.editor.component';
import { DateRendererEditorComponent } from './builder/controls/date-renderer.editor.component';
import { DateRangeRendererEditorComponent } from './builder/controls/date-range-renderer.editor.component';
import { SelectRendererEditorComponent } from './builder/controls/select-renderer.editor.component';
import { RadioRendererEditorComponent } from './builder/controls/radio-renderer.editor.component';
import { RangeRendererEditorComponent } from './builder/controls/range-renderer.editor.component';
import { ToggleRendererEditorComponent } from './builder/controls/toggle-renderer.editor.component';
import { WysiwygRendererEditorComponent } from './builder/controls/wysiwyg-renderer.editor.component';
import { CheckboxGroupRendererEditorComponent } from './builder/controls/checkbox-group-renderer.editor.component';
import { MultiselectRendererEditorComponent } from './builder/controls/multiselect-renderer.editor.component';
import { MentionRendererEditorComponent } from './builder/controls/mention-renderer.editor.component';
import { ImageRendererEditorComponent } from './builder/controls/image-renderer.editor.component';
import { GooglePlacesRendererEditorComponent } from './builder/controls/google-places-renderer.editor.component';
import { CountryIsoRendererEditorComponent } from './builder/controls/country-iso-renderer.editor.component';

// Layout Editors
import { VerticalLayoutEditorComponent } from './builder/layouts/vertical-layout.editor.component';
import { HorizontalLayoutEditorComponent } from './builder/layouts/horizontal-layout.editor.component';
import { GroupLayoutEditorComponent } from './builder/layouts/group-layout.editor.component';
import { CardGroupLayoutEditorComponent } from './builder/layouts/card-group-layout.editor.component';
import { CategorizationLayoutEditorComponent } from './builder/layouts/categorization-layout.editor.component';
import { StepperLayoutEditorComponent } from './builder/layouts/stepper-layout.editor.component';
import { ArrayLayoutEditorComponent } from './builder/layouts/array-layout.editor.component';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'app-builder-page',
  templateUrl: './builder-page.component.html',
  styleUrls: ['./builder-page.component.scss'],
  imports: [
    DragDropModule,
    ListInputSourceComponent,
    NzButtonModule,
    NzIconModule,
    ListInputTargetComponent,
    TitleCasePipe,
    NzCollapseModule,
    FormsModule,
    NzInputModule,
    NzTabsModule,
    AsyncPipe,
    JsonPipe,
    JsonFormsZorroModule,
    NzTooltipDirective,
    // Control Editors
    TextRendererEditorComponent,
    TextareaRendererEditorComponent,
    NumberRendererEditorComponent,
    BooleanRendererEditorComponent,
    DateRendererEditorComponent,
    DateRangeRendererEditorComponent,
    SelectRendererEditorComponent,
    RadioRendererEditorComponent,
    RangeRendererEditorComponent,
    ToggleRendererEditorComponent,
    WysiwygRendererEditorComponent,
    CheckboxGroupRendererEditorComponent,
    MultiselectRendererEditorComponent,
    MentionRendererEditorComponent,
    ImageRendererEditorComponent,
    GooglePlacesRendererEditorComponent,
    CountryIsoRendererEditorComponent,
    // Layout Editors
    VerticalLayoutEditorComponent,
    HorizontalLayoutEditorComponent,
    GroupLayoutEditorComponent,
    CardGroupLayoutEditorComponent,
    CategorizationLayoutEditorComponent,
    StepperLayoutEditorComponent,
    ArrayLayoutEditorComponent,
  ],
})
export class BuilderPageComponent {
  readonly TYPES = JFZBuilderInputType;
  readonly LAYOUT_TYPES = JFZBuilderLayoutType;
  readonly renderers = ngZorroRenderers;
  itemsTemp: Record<string, JFZBuilderItem> = {};
  formData = {};

  constructor(public service: BuilderService) {}

  isControl(item: JFZBuilderItem): item is JFZBuilderControl {
    return this.service.isControl(item);
  }

  isLayout(item: JFZBuilderItem): item is JFZBuilderLayout {
    return this.service.isLayout(item);
  }

  getItemLabel(item: JFZBuilderItem): string {
    if (this.isControl(item)) {
      return item.uiSchema.label || item.name;
    } else if (this.isLayout(item)) {
      return item.label || item.uiSchema.label || item.type;
    }
    return '';
  }

  getItemIcon(item: JFZBuilderItem): string {
    return item.icon;
  }

  updateUiSchema(item: JFZBuilderItem, property: string, value: any): void {
    const tempItem = this.getItemFromTemp(item);
    if (this.isControl(tempItem)) {
      this.itemsTemp[tempItem.key!] = {
        ...tempItem,
        uiSchema: { ...tempItem.uiSchema, [property]: value },
      };
    } else if (this.isLayout(tempItem)) {
      this.itemsTemp[tempItem.key!] = {
        ...tempItem,
        uiSchema: { ...tempItem.uiSchema, [property]: value },
      };
    }
  }

  openEditor(item: JFZBuilderItem): void {
    const tempItem = this.getItemFromTemp(item);
    this.itemsTemp[tempItem.key!] = {
      ...tempItem,
      editor: true,
    };
  }

  updateControl(control: JFZBuilderControl): void {
    this.itemsTemp[control.key!] = control;
  }

  updateLayout(layout: JFZBuilderLayout): void {
    this.itemsTemp[layout.key!] = layout;
  }

  updateControlName(control: JFZBuilderControl, name: string): void {
    const input = this.getItemFromTemp(control) as JFZBuilderControl;
    this.itemsTemp[input.key!] = {
      ...input,
      name,
      uiSchema: { ...input.uiSchema, scope: '#/properties/' + name },
    };
  }

  updateLayoutLabel(layout: JFZBuilderLayout, label: string): void {
    const tempLayout = this.getItemFromTemp(layout) as JFZBuilderLayout;
    this.itemsTemp[tempLayout.key!] = {
      ...tempLayout,
      label,
      uiSchema: { ...tempLayout.uiSchema, label },
    };
  }

  saveChanges(key: string): void {
    if (this.itemsTemp[key]) {
      this.itemsTemp[key].editor = false;
      if (this.isControl(this.itemsTemp[key])) {
        this.service.updateItem(key, this.itemsTemp[key] as JFZBuilderControl);
      } else if (this.isLayout(this.itemsTemp[key])) {
        this.service.updateItem(key, this.itemsTemp[key] as JFZBuilderLayout);
      }
    }
  }

  removeField(key: string): void {
    delete this.itemsTemp[key];
    this.service.removeItem(key);
  }

  undo(): void {
    this.service.undo();
  }

  redo(): void {
    this.service.redo();
  }

  private getItemFromTemp(item: JFZBuilderItem): JFZBuilderItem {
    return this.itemsTemp[item.key!] || item;
  }

  getControlFromTemp(key: string): JFZBuilderControl | null {
    const item = this.itemsTemp[key];
    return item && this.isControl(item) ? item : null;
  }

  getLayoutFromTemp(key: string): JFZBuilderLayout | null {
    const item = this.itemsTemp[key];
    return item && this.isLayout(item) ? item : null;
  }
}
