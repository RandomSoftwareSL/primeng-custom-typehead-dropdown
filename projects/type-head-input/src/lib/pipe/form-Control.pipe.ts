import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, UntypedFormControl } from '@angular/forms';

@Pipe({
  name: 'formControl',
  standalone: false,
})
export class FormControlPipe implements PipeTransform {
  transform(value: AbstractControl | null): UntypedFormControl {
    const ctrl = value as UntypedFormControl;
    return ctrl;
  }
}
