import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { BuilderService } from './builder.service';
import { CdkDragExit, DragDropModule } from '@angular/cdk/drag-drop';
import { NgTemplateOutlet } from '@angular/common';
import { JFZBuilderItem } from './model';

@Component({
  imports: [DragDropModule, NgTemplateOutlet],
  selector: 'dnd-list-input-source',
  template: `
    <div class="source-container">
      <!-- Controls Section -->
      <div class="section-header">
        <h3>Controls</h3>
      </div>
      <div
        cdkDropList
        cdkDropListSortingDisabled
        [class]="listContainerClass"
        [cdkDropListData]="service.copyFromControls"
        [cdkDropListEnterPredicate]="_alwaysPreventDropPredicate"
        (cdkDropListExited)="addTemporaryItem($event)"
        (cdkDropListEntered)="cleanupTemporaryItems()"
      >
        @for (item of service.copyFromControls; track item; let isLast = $last; let index = $index) {
          <div [class]="itemContainerClass" [class.disabled]="item.disabled" [cdkDragData]="item" [cdkDragDisabled]="item.disabled" cdkDrag>
            <ng-template
              [ngTemplateOutlet]="itemRef || null"
              [ngTemplateOutletContext]="{
                $implicit: {
                  item,
                  index,
                  isLast
                }
              }"
            >
            </ng-template>
          </div>
        }
      </div>

      <!-- Layouts Section -->
      <div class="section-header">
        <h3>Layouts</h3>
      </div>
      <div
        cdkDropList
        cdkDropListSortingDisabled
        [class]="listContainerClass"
        [cdkDropListData]="service.copyFromLayouts"
        [cdkDropListEnterPredicate]="_alwaysPreventDropPredicate"
        (cdkDropListExited)="addTemporaryItem($event)"
        (cdkDropListEntered)="cleanupTemporaryItems()"
      >
        @for (item of service.copyFromLayouts; track item; let isLast = $last; let index = $index) {
          <div [class]="itemContainerClass" [cdkDragData]="item" cdkDrag>
            <ng-template
              [ngTemplateOutlet]="itemRef || null"
              [ngTemplateOutletContext]="{
                $implicit: {
                  item,
                  index,
                  isLast
                }
              }"
            >
            </ng-template>
          </div>
        }
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .source-container {
        display: flex;
        flex-direction: column;
        gap: 16px;
      }

      .section-header {
        padding: 0 0 5px 0;
        border-bottom: 1px solid #f0f0f0;
      }

      .section-header h3 {
        margin: 0;
        font-size: 14px;
        font-weight: 600;
        color: #595959;
      }

      .disabled {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }
    `,
  ],
})
export class ListInputSourceComponent {
  @Input() listContainerClass: string = '';
  @Input() itemContainerClass: string = '';
  @ContentChild('input') itemRef!: TemplateRef<any>;

  constructor(public service: BuilderService) {}

  public addItem(item: JFZBuilderItem) {
    this.service.addItem(item);
  }

  public cleanupTemporaryItems() {
    this.service.cleanupTemporaryItems();
  }

  public addTemporaryItem(event: CdkDragExit<any>) {
    this.service.addTemporaryItem(event.item.data);
  }

  _alwaysPreventDropPredicate() {
    return false;
  }
}
