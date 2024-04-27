import { Pipe, PipeTransform } from '@angular/core';
import { NzFormControlStatusType } from 'ng-zorro-antd/form';

@Pipe({
  name: 'nzValidationStatus',
  standalone: true,
})
export class NzValidationStatusPipe implements PipeTransform {
  transform(formControlStatus: string): NzFormControlStatusType {
    switch (formControlStatus) {
      case 'PENDING':
        return 'validating';
      case 'INVALID':
        return 'error';
      case 'VALID':
        return 'success';
      default:
        return null;
    }
  }
}
