import { AbstractControl, ValidatorFn } from '@angular/forms';

export const EMAIL_VALIDATION_PATTERN =
  /[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/;

export function EmailValidator(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any | null } => {
    let valid: boolean;
    if (!control.value || !control.value.length ) {
      valid =  true;
    } else {
      valid = (EMAIL_VALIDATION_PATTERN.test(control.value) && control.value.length <= 75);
    }
    return valid ? null : { 'EmailValidator': true };
  };
}
