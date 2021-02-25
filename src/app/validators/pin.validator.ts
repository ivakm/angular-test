import { AbstractControl, ValidatorFn } from '@angular/forms';

export function PinValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any | null } => {
    return control.value.toString().length === 4 ? null : { 'Pin': true };
  };
}
