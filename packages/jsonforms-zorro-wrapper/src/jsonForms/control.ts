import {
  JsonFormsState,
  mapStateToControlProps,
  mapStateToControlWithDetailProps,
  StatePropsOfControl,
  StatePropsOfControlWithDetail,
} from '@jsonforms/core';
import { OnDestroy, OnInit } from '@angular/core';
import { JsonFormsAbstractControl } from './abstract-control';

export class JsonFormsControl extends JsonFormsAbstractControl<StatePropsOfControl> implements OnInit, OnDestroy {
  protected mapToProps(state: JsonFormsState): StatePropsOfControl {
    const props = mapStateToControlProps(state, this.getOwnProps());
    return { ...props };
  }
}

export class JsonFormsControlWithDetail extends JsonFormsAbstractControl<StatePropsOfControlWithDetail> implements OnInit, OnDestroy {
  protected mapToProps(state: JsonFormsState): StatePropsOfControlWithDetail {
    const props = mapStateToControlWithDetailProps(state, this.getOwnProps());
    return { ...props };
  }
}
