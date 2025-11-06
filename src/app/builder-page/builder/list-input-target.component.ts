import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { BuilderService } from './builder.service';
import { JFZBuilderControl } from './model';

@Component({
  imports: [DragDropModule, NgTemplateOutlet],
  selector: 'dnd-list-input-target',
  template: `
    <div
      cdkDropList
      [class]="listContainerClass"
      [class.hidden-placeholder]="service.dropInputs.length === 0"
      [cdkDropListData]="service.dropInputs"
      [class.list]="service.dropInputs.length > 0"
      (cdkDropListEntered)="_forcePreviewIconContainerHidden = true"
      (cdkDropListExited)="_forcePreviewIconContainerHidden = false"
      (cdkDropListDropped)="drop($event)"
    >
      @for (item of service.dropInputs; track item; let isLast = $last; let index = $index) {
        <div
          cdkDrag
          (mouseenter)="_mouserOverItemIndex = index"
          (mouseleave)="_mouserOverItemIndex = -1"
          [cdkDragData]="item"
          [class]="itemContainerClass"
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

      @if (!_forcePreviewIconContainerHidden && service.dropInputs.length < 1) {
        <ng-template [ngTemplateOutlet]="placeholderRef || null"></ng-template>
      }
    </div>

    <ng-template #body></ng-template>
  `,
  styles: [':host {display: block;}'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListInputTargetComponent {
  @ContentChild('item') itemRef?: TemplateRef<any>;
  @ContentChild('placeholder') placeholderRef?: TemplateRef<any>;
  @ContentChild('dragHandle') dragHandleRef?: TemplateRef<any>;
  @Input() listContainerClass: string = '';
  @Input() itemContainerClass: string = '';
  @Output() inputAdded = new EventEmitter<JFZBuilderControl>();
  _mouserOverItemIndex = -1;
  _forcePreviewIconContainerHidden = false;

  constructor(public service: BuilderService) {}

  drop(event: CdkDragDrop<JFZBuilderControl[]>): void {
    const item = this.service.handleDropEvent(event);
    this.inputAdded.next(item);
  }
}
