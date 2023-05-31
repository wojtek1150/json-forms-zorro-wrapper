import { JsonFormsState, mapStateToArrayControlProps, StatePropsOfArrayControl } from '../core';
import { OnDestroy, OnInit } from '@angular/core';
import { JsonFormsAbstractControl } from './abstract-control';

export class JsonFormsArrayControl extends JsonFormsAbstractControl<StatePropsOfArrayControl> implements OnInit, OnDestroy {
  protected mapToProps(state: JsonFormsState): StatePropsOfArrayControl {
    const props = mapStateToArrayControlProps(state, this.getOwnProps());
    return { ...props };
  }
}
