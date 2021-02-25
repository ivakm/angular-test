import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CurrentUserService } from "../../services/currentUser/current-user.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {

  constructor(
    private _currentUser: CurrentUserService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this._currentUser.logout();
  }

}
