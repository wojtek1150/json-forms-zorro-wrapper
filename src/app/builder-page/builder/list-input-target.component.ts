import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output, TemplateRef, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { BuilderService } from './builder.service';
import { JFZBuilderItem } from './model';

@Component({
  imports: [DragDropModule, NgTemplateOutlet],
  selector: 'dnd-list-input-target',
  template: `
    <div
      cdkDropList
      [class]="listContainerClass"
      [class.hidden-placeholder]="displayItems.length === 0 && !parentLayoutKey"
      [cdkDropListData]="displayItems"
      [class.list]="displayItems.length > 0"
      [class.layout-drop-zone]="!!parentLayoutKey"
      (cdkDropListEntered)="_forcePreviewIconContainerHidden = true"
      (cdkDropListExited)="_forcePreviewIconContainerHidden = false"
      (cdkDropListDropped)="drop($event)"
    >
      @for (item of displayItems; track item.key; let isLast = $last; let index = $index) {
        <!-- Control Item -->
        @if (service.isControl(item)) {
          <div
            cdkDrag
            (mouseenter)="_mouserOverItemIndex = index"
            (mouseleave)="_mouserOverItemIndex = -1"
            [cdkDragData]="item"
            [class]="itemContainerClass"
            [class.control-item]="true"
          >
            @if (dragHandleRef) {
              <span cdkDragHandle>
                <ng-container [ngTemplateOutlet]="dragHandleRef"></ng-container>
              </span>
            }
            <ng-template
              [ngTemplateOutlet]="itemRef || null"
              [ngTemplateOutletContext]="{
                $implicit: {
                  item,
                  isHovered: _mouserOverItemIndex === index
                }
              }"
            >
            </ng-template>
          </div>
        }
        
        <!-- Layout Item with nested drop zone -->
        @if (service.isLayout(item)) {
          <div class="layout-wrapper">
            <!-- Layout header - draggable -->
            <div
              cdkDrag
              (mouseenter)="_mouserOverItemIndex = index"
              (mouseleave)="_mouserOverItemIndex = -1"
              [cdkDragData]="item"
              [class]="itemContainerClass"
              [class.layout-item]="true"
            >
              @if (dragHandleRef) {
                <span cdkDragHandle>
                  <ng-container [ngTemplateOutlet]="dragHandleRef"></ng-container>
                </span>
              }
              <div class="layout-header">
                <ng-template
                  [ngTemplateOutlet]="layoutRef || itemRef || null"
                  [ngTemplateOutletContext]="{
                    $implicit: {
                      item,
                      isHovered: _mouserOverItemIndex === index
                    }
                  }"
                >
                </ng-template>
              </div>
            </div>
            
            <!-- Nested drop zone for layout elements - separate from draggable header -->
            <div class="layout-content">
              <dnd-list-input-target
                [items]="service.findLayoutElements(item.key!)"
                [parentLayoutKey]="item.key"
                [listContainerClass]="'nested-drop-zone'"
                [itemContainerClass]="itemContainerClass"
                [connectedDropLists]="[]"
                (itemAdded)="itemAdded.emit($event)"
              >
                @if (dragHandleRef) {
                  <ng-template #dragHandle>
                    <ng-container [ngTemplateOutlet]="dragHandleRef"></ng-container>
                  </ng-template>
                }
                @if (itemRef) {
                  <ng-template #item let-it>
                    <ng-container [ngTemplateOutlet]="itemRef" [ngTemplateOutletContext]="{ $implicit: it }"></ng-container>
                  </ng-template>
                }
                @if (layoutRef) {
                  <ng-template #layout let-it>
                    <ng-container [ngTemplateOutlet]="layoutRef" [ngTemplateOutletContext]="{ $implicit: it }"></ng-container>
                  </ng-template>
                }
                @if (placeholderRef) {
                  <ng-template #placeholder>
                    <ng-container [ngTemplateOutlet]="placeholderRef"></ng-container>
                  </ng-template>
                }
              </dnd-list-input-target>
            </div>
          </div>
        }
      }

      @if (!_forcePreviewIconContainerHidden && displayItems.length < 1 && !parentLayoutKey) {
        <ng-template [ngTemplateOutlet]="placeholderRef || null"></ng-template>
      }
      
      @if (parentLayoutKey && displayItems.length < 1) {
        <div class="nested-placeholder">
          <p>Drop items into this layout</p>
        </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .layout-drop-zone {
        min-height: 60px;
        border: 2px dashed #d9d9d9;
        border-radius: 4px;
        padding: 8px;
        background-color: #fafafa;
        transition: all 0.2s;
      }

      .layout-drop-zone.cdk-drop-list-dragging {
        border-color: #1890ff;
        background-color: #e6f7ff;
      }

      .nested-drop-zone {
        margin-top: 8px;
        padding: 8px;
      }

      .layout-wrapper {
        display: flex;
        flex-direction: column;
        gap: 8px;
        margin: 10px 0;
      }

      .layout-header {
        flex: 0 0 auto;
      }

      .layout-content {
        flex: 1 1 auto;
        min-height: 60px;
      }

      .layout-item {
        border-left: 3px solid #1890ff;
        padding-left: 8px;
      }

      .control-item {
        border-left: 3px solid #52c41a;
        padding-left: 8px;
      }

      .nested-placeholder {
        padding: 16px;
        text-align: center;
        color: #8c8c8c;
        font-size: 12px;
      }

      .nested-placeholder p {
        margin: 0;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ListInputTargetComponent implements OnInit, OnChanges {
  @ContentChild('item') itemRef?: TemplateRef<any>;
  @ContentChild('layout') layoutRef?: TemplateRef<any>;
  @ContentChild('placeholder') placeholderRef?: TemplateRef<any>;
  @ContentChild('dragHandle') dragHandleRef?: TemplateRef<any>;
  @Input() items: JFZBuilderItem[] = [];
  @Input() parentLayoutKey?: string;
  @Input() listContainerClass: string = '';
  @Input() itemContainerClass: string = '';
  @Input() connectedDropLists: any[] = [];
  @Output() itemAdded = new EventEmitter<JFZBuilderItem>();
  _mouserOverItemIndex = -1;
  _forcePreviewIconContainerHidden = false;
  displayItems: JFZBuilderItem[] = [];

  constructor(public service: BuilderService) {}

  ngOnInit() {
    if (!this.parentLayoutKey) {
      // Root level - subscribe to root elements
      this.service.rootElements$.subscribe(elements => {
        this.displayItems = elements;
      });
    } else {
      // Nested level - get items from service to ensure reactivity
      this.updateDisplayItems();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // Update displayItems when items input changes (for nested layouts)
    if (changes['items'] && this.parentLayoutKey) {
      this.updateDisplayItems();
    }
  }

  private updateDisplayItems() {
    if (this.parentLayoutKey) {
      this.displayItems = this.service.findLayoutElements(this.parentLayoutKey) || [];
    } else {
      this.displayItems = this.items || [];
    }
  }

  drop(event: CdkDragDrop<JFZBuilderItem[]>): void {
    const item = this.service.handleDropEvent(event, this.parentLayoutKey);
    if (item) {
      // Update display items after drop for nested layouts
      if (this.parentLayoutKey) {
        this.updateDisplayItems();
      }
      this.itemAdded.emit(item);
    }
  }
}
