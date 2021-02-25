import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EmailValidator } from "../../validators/email.validator";
import { PinValidator } from "../../validators/pin.validator";
import { CurrentUserService } from "../../services/currentUser/current-user.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthComponent implements OnInit {
  form: FormGroup

  constructor(
    private _fb: FormBuilder,
    private _currentUser: CurrentUserService,
    private _router: Router,
  ) {
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      email: ['', [
        EmailValidator(),
        Validators.required,
        Validators.maxLength(30)]
      ],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(16)
      ]],
      pin: ['', [
        Validators.required,
        PinValidator()
      ]]

    })

    this.pin.valueChanges.subscribe(res => {
      const transformVal = res.toString();
      if (transformVal.length > 4) {
        let newNumber = transformVal.slice(0, 4);
        this.pin.setValue(newNumber);
      }
    })
  }

  get email(): FormGroup {
    return this.form.get('email') as FormGroup
  }

  get password(): FormGroup {
    return this.form.get('password') as FormGroup
  }

  get pin(): FormGroup {
    return this.form.get('pin') as FormGroup
  }

  auth(): void {
    this._currentUser.login(this.form.value)
    this._router.navigate(['/app'])
  }

}
