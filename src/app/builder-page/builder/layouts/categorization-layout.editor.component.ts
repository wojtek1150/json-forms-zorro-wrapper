import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { JFZBuilderLayout } from '../model';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import set from 'lodash-es/set';

@Component({
  imports: [NzInputModule, FormsModule, NzButtonModule, NzIconModule, CommonModule],
  selector: 'categorization-layout-editor',
  template: `
    <h3>Categorization Layout Options</h3>
    <nz-input-group nzAddOnBefore="Description">
      <input
        nz-input
        [ngModel]="layout.uiSchema.description"
        (ngModelChange)="updateDescription($event)"
        placeholder="Categorization description"
      />
    </nz-input-group>
    <div class="categories-section">
      <h4>Categories</h4>
      @for (category of categories; track $index; let i = $index) {
        <div class="category-item">
          <nz-input-group>
            <input
              nz-input
              [ngModel]="category.label"
              (ngModelChange)="updateCategoryLabel(i, $event)"
              placeholder="Category label"
            />
            <button nz-button nzType="text" nzDanger (click)="removeCategory(i)">
              <nz-icon nzType="delete" nzTheme="outline"></nz-icon>
            </button>
          </nz-input-group>
        </div>
      }
      <button nz-button nzType="dashed" (click)="addCategory()" style="width: 100%; margin-top: 8px;">
        <nz-icon nzType="plus" nzTheme="outline"></nz-icon>
        Add Category
      </button>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .categories-section {
        margin-top: 16px;
      }

      .category-item {
        display: flex;
        gap: 8px;
        margin-bottom: 8px;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategorizationLayoutEditorComponent {
  @Input() layout: JFZBuilderLayout;
  @Output() layoutChange = new EventEmitter<JFZBuilderLayout>();

  get categories(): any[] {
    return (this.layout.uiSchema as any).elements || [];
  }

  addCategory(): void {
    const newCategories = [...this.categories, { type: 'Category', label: `Category ${this.categories.length + 1}`, elements: [] }];
    set(this.layout, 'uiSchema.elements', newCategories);
    this.layoutChange.emit(this.layout);
  }

  updateCategoryLabel(index: number, label: string): void {
    const newCategories = [...this.categories];
    newCategories[index] = { ...newCategories[index], label };
    set(this.layout, 'uiSchema.elements', newCategories);
    this.layoutChange.emit(this.layout);
  }

  removeCategory(index: number): void {
    const newCategories = this.categories.filter((_, i) => i !== index);
    set(this.layout, 'uiSchema.elements', newCategories);
    this.layoutChange.emit(this.layout);
  }

  updateDescription(description: string): void {
    set(this.layout, 'uiSchema.description', description || undefined);
    this.layoutChange.emit(this.layout);
  }
}
