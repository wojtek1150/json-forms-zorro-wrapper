import { and, categorizationHasCategory, JsonFormsState, mapStateToLayoutProps, RankedTester, rankWith, uiTypeIs } from '../core';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { DescriptionRenderer, JsonFormsAngularService, JsonFormsBaseRenderer, JsonFormsOutlet } from '../jsonForms';
import { JFZCategorizationSchema } from '../other/uischema';
import { Subject, takeUntil } from 'rxjs';
import { NzTabComponent, NzTabsComponent } from 'ng-zorro-antd/tabs';

@Component({
  selector: 'jsonforms-categorization-layout',
  template: `
    <nz-tabs [class.hidden]="hidden">
      @for (category of uischema.elements; track category) {
        <nz-tab [nzTitle]="category.label">
          <DescriptionRenderer [uiSchema]="uischema" [scopedSchema]="schema"></DescriptionRenderer>
          @for (element of category.elements; track element) {
            <div>
              <jsonforms-outlet [uischema]="element" [path]="path" [schema]="schema"></jsonforms-outlet>
            </div>
          }
        </nz-tab>
      }
    </nz-tabs>
  `,
  styles: [
    `
      .hidden {
        display: none;
      }
    `,
  ],
  imports: [NzTabsComponent, NzTabComponent, DescriptionRenderer, JsonFormsOutlet],
})
export class CategorizationTabLayoutRenderer extends JsonFormsBaseRenderer<JFZCategorizationSchema> implements OnInit, OnDestroy {
  hidden = false;
  private readonly destroy$ = new Subject<void>();

  constructor(private jsonFormsService: JsonFormsAngularService) {
    super();
  }

  ngOnInit() {
    this.jsonFormsService.$state.pipe(takeUntil(this.destroy$)).subscribe((state: JsonFormsState) => {
      const props = mapStateToLayoutProps(state, this.getOwnProps());
      this.hidden = !props.visible;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

export const CategorizationTester: RankedTester = rankWith(1, and(uiTypeIs('Categorization'), categorizationHasCategory));
