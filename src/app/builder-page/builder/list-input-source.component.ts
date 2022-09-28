import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { BuilderService } from './builder.service';
import { CdkDragExit, DragDropModule } from '@angular/cdk/drag-drop';
import { JsonPipe, NgForOf, NgTemplateOutlet } from '@angular/common';
import { JFZBuilderControl } from './model';

@Component({
  standalone: true,
  imports: [DragDropModule, NgTemplateOutlet, NgForOf, JsonPipe],
  selector: 'dnd-list-input-source',
  template: `
    <div
      cdkDropList
      cdkDropListSortingDisabled
      [class]="listContainerClass"
      [cdkDropListData]="service.copyFromInputs"
      [cdkDropListEnterPredicate]="_alwaysPreventDropPredicate"
      (cdkDropListExited)="addTemporaryInput($event)"
      (cdkDropListEntered)="cleanupTmeporaryInputs()"
    >
      <div
        [class]="itemContainerClass"
        [cdkDragData]="input"
        cdkDrag
        *ngFor="let input of service.copyFromInputs; let isLast = last; let index = index"
      >
        <ng-template
          [ngTemplateOutlet]="itemRef || null"
          [ngTemplateOutletContext]="{
            $implicit: {
              input,
              index,
              isLast
            }
          }"
        >
        </ng-template>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }
    `,
  ],
})
export class ListInputSourceComponent {
  @Input() listContainerClass: string = '';
  @Input() itemContainerClass: string = '';
  @ContentChild('input') itemRef!: TemplateRef<any>;

  constructor(public service: BuilderService) {}

  public addItem(control: JFZBuilderControl) {
    this.service.addItem(control);
  }

  public cleanupTmeporaryInputs() {
    this.service.cleanupTemporaryInputTypes();
  }

  public addTemporaryInput(event: CdkDragExit<any>) {
    this.service.addTemporaryInput(event.item.data);
  }

  _alwaysPreventDropPredicate() {
    return false;
  }
}
