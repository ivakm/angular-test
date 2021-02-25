import { AbstractControl, ValidatorFn } from '@angular/forms';

export function EmptyString(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any | null } => {
    return control.value.trim().length ? null : { 'EmptyString': true };
  };
}
