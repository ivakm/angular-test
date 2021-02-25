import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { CurrentUserService } from "../../services/currentUser/current-user.service";
import { CookieService } from "ngx-cookie";


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private _currentUserService: CurrentUserService,
    private _router: Router,
    private _cookieService: CookieService
  ) {
  }


  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this._currentUserService.isUserLogin()) {
      return true;
    } else {
      console.log('false')
      this._router.navigate(['auth']);
      return false;
    }
  }

}
