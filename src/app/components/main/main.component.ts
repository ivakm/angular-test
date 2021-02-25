import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CurrentUserService } from "../../services/currentUser/current-user.service";
import { JobsService } from "../../services/jobs/jobs.service";
import { EMPTY, Observable, Subject } from "rxjs";
import { catchError, debounceTime, distinctUntilChanged, switchMap, takeUntil } from "rxjs/operators";
import { FormBuilder, FormGroup } from "@angular/forms";
import { iJobs } from "../../models/jobs/jobs.model";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit, OnDestroy {
  form: FormGroup;
  pageNumber = 1;
  showRecordsOnPage = 1;
  jobs: iJobs[] = [];
  private _unsubscribe = new Subject();

  constructor(
    private _fb: FormBuilder,
    private _currentUser: CurrentUserService,
    private _jobs: JobsService
  ) {
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      search: [''],
      countRecords: [0]
    });

    this.search.valueChanges
      .pipe(
        takeUntil(this._unsubscribe),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap(search => {
          return this.getJobs(search)
        }),
        catchError(e => {
          console.error(e);
          return EMPTY;
        })
      )
      .subscribe(val => {
        this.jobs = val;
      })
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  logout() {
    this._currentUser.logout();
  }

  getJobs(description: string): Observable<any[]> {
    const reqData = {
      description,
      page: this.pageNumber
    }
    const strForQuery = this.transformDataToText(reqData);

    return this._jobs.getJobs(strForQuery)
      .pipe(
        takeUntil(this._unsubscribe)
      )
  }

  get search(): FormGroup {
    return this.form.get('search') as FormGroup
  }

  get countRecords(): FormGroup {
    return this.form.get('countRecords') as FormGroup
  }

  transformDataToText(data: {}): string {
    let requestStr = '?';

    for(const key in data) {
      requestStr += key + '=' + data[key] + '&';
    }
    return requestStr.slice(0, -1)
  }

}
