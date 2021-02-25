import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { EMPTY, Observable } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class JobsService {

  private URL_SEARCH_JOBS = "https://jobs.github.com/positions.json";

  constructor(
    private _http: HttpClient
  ) {
  }

  getJobs(data: string): Observable<any> {
    // тут повинен бути метод POST
    return this._http.get(this.URL_SEARCH_JOBS + data)
      .pipe(
        catchError(e => {
          console.error(e);
          return EMPTY;
        })
      )
  }
}
