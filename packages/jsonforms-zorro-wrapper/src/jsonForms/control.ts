import {
  JsonFormsState,
  mapStateToControlProps,
  mapStateToControlWithDetailProps,
  StatePropsOfControl,
  StatePropsOfControlWithDetail,
} from '../core';
import { OnDestroy, OnInit } from '@angular/core';
import { JsonFormsAbstractControl } from './abstract-control';
import { UiSchemaControlBaseOptions } from '../models/uischema';

export class JsonFormsControl<ControlOptions = UiSchemaControlBaseOptions> extends JsonFormsAbstractControl<StatePropsOfControl, ControlOptions> implements OnInit, OnDestroy {
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
