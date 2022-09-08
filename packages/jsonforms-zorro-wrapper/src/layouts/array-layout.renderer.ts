import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import {
  ArrayLayoutProps,
  createDefaultValue,
  findUISchema,
  isObjectArrayControl,
  JsonFormsState,
  mapDispatchToArrayControlProps,
  mapStateToArrayLayoutProps,
  OwnPropsOfRenderer,
  Paths,
  RankedTester,
  rankWith,
  setReadonly,
  StatePropsOfArrayLayout,
  UISchemaElement,
  UISchemaTester,
  unsetReadonly,
} from '@jsonforms/core';
import { JsonFormsAbstractControl } from '../jsonForms/abstract-control';
import { JsonFormsAngularService } from '../jsonForms';

@Component({
  selector: 'ArrayLayoutRenderer',
  template: `
    <div [class.hidden]="hidden">
      <div [ngClass]="'array-layout-toolbar'">
        <nz-badge [nzCount]="errorsNo" [title]="error">
          <h2>{{ label }}</h2>
        </nz-badge>
        <button nz-button title="{{ addTooltip }}" [disabled]="!isEnabled()" (click)="add()">
          <i nz-icon nzType="plus" nzTheme="outline"></i>
        </button>
      </div>
      <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="schema"></DescriptionRenderer>
      <p *ngIf="noData">{{ noDataMessage }}</p>
      <div *ngFor="let item of [].constructor(data); let idx = index; trackBy: trackByFn; last as last">
        <div class="row">
          <div class="content">
            <jsonforms-outlet [renderProps]="getProps(idx)"></jsonforms-outlet>
          </div>
          <div class="actions" *ngIf="isEnabled()">
            <button nz-button nzDanger (click)="remove(idx)" title="{{ removeTooltip }}">
              <i nz-icon nzType="delete" nzTheme="outline"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .array-layout-toolbar,
      .row {
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      h2 {
        margin: 0;
      }

      .hidden {
        display: none;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArrayLayoutRenderer extends JsonFormsAbstractControl<StatePropsOfArrayLayout> implements OnInit, OnDestroy {
  addTooltip: string;
  addAriaLabel: string;
  noDataMessage: string;
  removeTooltip: string;
  removeAriaLabel: string;
  noData: boolean;
  addItem: (path: string, value: any) => () => void;
  removeItems: (path: string, toDelete: number[]) => () => void;
  uischemas: {
    tester: UISchemaTester;
    uischema: UISchemaElement;
  }[];

  constructor(jsonFormsService: JsonFormsAngularService, changeDetectorRef: ChangeDetectorRef) {
    super(jsonFormsService, changeDetectorRef);
  }

  get errorsNo(): number {
    return this.error.split(/\n/).filter(s => !!s).length;
  }

  mapToProps(state: JsonFormsState): StatePropsOfArrayLayout {
    const props = mapStateToArrayLayoutProps(state, this.getOwnProps());
    return { ...props };
  }

  remove(index: number): void {
    this.removeItems(this.propsPath, [index])();
  }

  add(): void {
    this.addItem(this.propsPath, createDefaultValue(this.scopedSchema))();
  }

  override ngOnInit() {
    super.ngOnInit();
    const { addItem, removeItems } = mapDispatchToArrayControlProps(this.jsonFormsService.updateCore.bind(this.jsonFormsService));
    this.addItem = addItem;
    this.removeItems = removeItems;
  }

  override mapAdditionalProps(props: ArrayLayoutProps) {
    this.noData = !props.data || props.data === 0;
    this.uischemas = props.uischemas;
    this.addTooltip = `Add to ${this.label}`;
    this.addAriaLabel = `Add to ${this.label} button`;
    this.removeTooltip = `Delete`;
    this.removeAriaLabel = `Delete button`;
    this.noDataMessage = `No data`;
  }

  getProps(index: number): OwnPropsOfRenderer {
    const uischema = findUISchema(this.uischemas, this.scopedSchema, this.uischema.scope, this.propsPath, undefined, this.uischema, this.rootSchema);
    if (this.isEnabled()) {
      unsetReadonly(uischema);
    } else {
      setReadonly(uischema);
    }
    return {
      schema: this.scopedSchema,
      path: Paths.compose(this.propsPath, `${index}`),
      uischema,
    };
  }

  trackByFn(index: number) {
    return index;
  }
}

export const ArrayLayoutRendererTester: RankedTester = rankWith(4, isObjectArrayControl);
