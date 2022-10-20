import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as createId } from 'uuid';
import { JFZBuilderControl, jfzBuilderInputs } from './model';
import { JFZVerticalLayout } from '@wojtek1150/jsonforms-zorro-wrapper';
import { JsonSchema } from '@jsonforms/core';

@Injectable({ providedIn: 'root' })
export class BuilderService {
  copyFromInputs: JFZBuilderControl[] = [...jfzBuilderInputs];
  dropInputs: JFZBuilderControl[] = [];

  private _fields$ = new BehaviorSubject<JFZBuilderControl[]>([]);
  fields$ = this._fields$.asObservable();

  private _uiSchema$ = new BehaviorSubject<JFZVerticalLayout>({ elements: [], type: 'VerticalLayout' });
  uiSchema$ = this._uiSchema$.asObservable();

  private _formSchema$ = new BehaviorSubject<JsonSchema>({ type: 'object', properties: {} });
  formSchema$ = this._formSchema$.asObservable();

  handleDropEvent(event: CdkDragDrop<JFZBuilderControl[]>): JFZBuilderControl | undefined {
    this.cleanupTemporaryInputTypes();
    const { data } = event.item;
    try {
      if (event.previousContainer === event.container) {
        moveItemInArray(
          event.container.data, // current target container data before item dropped
          event.previousIndex, // index of the item in the source container being dragged
          event.currentIndex // desired index of item in the target container
        );
        return data;
      } else {
        const key = createId().replace('-', '');
        const item: JFZBuilderControl = { key, ...data };
        event.container.data.splice(event.currentIndex, 0, item);
        return item;
      }
    } finally {
      this.setFields();
    }
  }

  addItem(config: JFZBuilderControl): void {
    this.dropInputs = this.dropInputs.concat(config);
    this.setFields();
  }

  updateFormLabel(config: JFZBuilderControl, label: string): void {
    this.dropInputs = this.dropInputs.map(item => {
      if (item.key === config.key) {
        return {
          ...item,
          uiSchema: { ...item.uiSchema, label },
        };
      } else {
        return item;
      }
    });
    this.setFields();
  }

  updateControlData(key: string, data: JFZBuilderControl): void {
    this.dropInputs = this.dropInputs
      .map(item => {
        if (item.key === key) {
          return !data ? null : { ...item, ...data };
        } else {
          return item;
        }
      })
      .filter(item => item);
    this.setFields();
  }

  cleanupTemporaryInputTypes(): void {
    this.copyFromInputs = this.copyFromInputs.filter(it => !it.temp);
  }

  addTemporaryInput(data: JFZBuilderControl): void {
    // dnd hack - leaving 'copy from' list, create a temporary item to make the list look the same
    const index = this.copyFromInputs.findIndex(it => it === data);
    this.copyFromInputs.splice(index + 1, 0, {
      ...data,
      temp: true,
    });
  }

  private setFields(config: JFZBuilderControl[] = this.dropInputs): void {
    this._fields$.next(JSON.parse(JSON.stringify(config)));
    this.toUiSchema(config);
    this.toFormSchema(config);
  }

  private toUiSchema(config: JFZBuilderControl[] = this.dropInputs): void {
    const elements = config.map(item => item.uiSchema);
    this._uiSchema$.next({ type: 'VerticalLayout', elements });
  }

  private toFormSchema(config: JFZBuilderControl[] = this.dropInputs): void {
    const properties = {};
    config.forEach(item => {
      properties[item.name] = item.formSchema;
    });
    this._formSchema$.next({ type: 'object', properties });
  }

  private scopeToLocation(scope: string): string {
    return scope
      .split('/')
      .filter(i => i !== '#')
      .join('.');
  }
}
