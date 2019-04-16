import { Injectable } from '@angular/core';
import { throwError, Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators';
import { environment } from '../../environments/environment';
import { IDealer } from '../_models/dealer';

@Injectable({
  providedIn: 'root'
})
export class DealerdbService {

  private getDealerUrl: string = environment.API_ENDPOINT + 'dealer';
  private putDealerUrl: string = environment.API_ENDPOINT + 'profile';

  constructor(private http: HttpClient) { }

  getDealer(id: number): Observable<IDealer> {
    const url = `${this.getDealerUrl}/${id}`;
    return this.http.get<IDealer>(url).pipe(
      // .do(data => console.log('All: ' +  JSON.stringify(data)))
      catchError(this.handleError)
    );
  }

  putDealer(dealer: IDealer): Observable<IDealer> {

    const url = `${this.putDealerUrl}`;
    const body = JSON.stringify(dealer);
    const options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

    return this.http.put<IDealer>(url, body, options).pipe(
      // .do(data => console.log('All: ' +  JSON.stringify(data)))
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ProgressEvent) { // connection problem
      return throwError(error.message || 'Server error');
    } else {
      return throwError(error.status + ' ' + error.error);           // error.error contains error message
    }
  }

  // private handleError(error: HttpErrorResponse) {
  //   let errMsg: string | null = null;
  //   let errDetail: string | null = null;

  //   if (error.error instanceof ErrorEvent) {
  //     // A client-side or network error occurred. Handle it accordingly.
  //     errMsg = error.error.message;
  //   } else {
  //     // The backend returned an unsuccessful response code.
  //     // The response body may contain clues as to what went wrong,
  //     if (error.error) {
  //       errDetail = `Backend returned code ${error.status}, ` +
  //         `body was: ${error.error.Message}`;
  //       if (error.error.Message) {
  //         errMsg = error.error.Message;
  //       } else { errMsg = error.error; }
  //     } else {
  //       errDetail = `Backend returned code ${error.status}, ` +
  //         `body was: ${error.statusText}`;
  //       errMsg = error.statusText;
  //     }
  //   }
  //   return observableThrowError(
  //     {
  //       'errMsg': errMsg,
  //       'errDetail': errDetail,
  //       "errObj": error
  //     });
  //}

}
