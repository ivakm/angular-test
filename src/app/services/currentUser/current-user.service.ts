import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie";
import { iUserData, ModelUser } from "../../models/user/user.model";

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  dataForAccess = {
    email: 'test@ukr.net',
    password: '123456',
    pin: 1111
  }
  _currentUser: ModelUser;

  constructor(private _cookieService: CookieService) {
  }

  isUserLogin(): boolean {
    const data = this._cookieService.getObject('authorizationData')
    return !!data;
  }

  login(userInfo: iUserData): void {
    const checkAuth = this.checkEqualData(userInfo);

    if (checkAuth) {
      this._currentUser = new ModelUser({
        email: userInfo.email,
        password: userInfo.password,
        pin: userInfo.pin
      });
      this.initAuthorizedCookie(this._currentUser)
    } else {
      alert('Користувача з такими даними - не знайдено');
    }
  }

  initAuthorizedCookie(model: ModelUser): void {
    const newCookie = { ...{}, ...model.toJson() };
    this._cookieService.putObject('authorizationData', newCookie);
  }

  logout(): void {
    this.deleteCookies();
    window.location.reload();
  }

  deleteCookies(): void {
    this._cookieService.removeAll();
  }

  checkEqualData(userInfo: iUserData): boolean {
    return JSON.stringify(this.dataForAccess) === JSON.stringify(userInfo);
  }
}
