import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  /**
   *Creates an instance of DataService.
   * @param {HttpClient} http
   * @memberof DataService
   */
  constructor(private http: HttpClient) { }

  /**
   * GET data from the server
   * @param {*} url
   * @returns {Observable<any>}
   * @memberof DataService
   */
  getData(url): Observable<any> {
    return this.http.get<any>(url)
      .pipe(
        tap(response => response),
        catchError(this.handleError('getData', []))
      );
  }

  /**
   * POST call setData
   * @param {*} url
   * @param {*} data
   * @returns {Observable<any>}
   * @memberof DataService
   */
  setData(url, data): Observable<any> {
    return this.http.post<any>(url, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .pipe(
        tap(response => response),
        catchError(this.handleError('setData', []))
      );
  }

  updateData(url, data): Observable<any> {
    return this.http.put<any>(url, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .pipe(
        tap(response => response),
        catchError(this.handleError('getData', []))
      );
  }

  /**
  * Get data with pagination
  * @param {string} url
  * @param {number} pageNumber
  */
  getPageData(url: string, pageNum: number): Observable<any> {
    return this.http.get<any>(`${url}/?_page=${pageNum}`)
      .pipe(
        tap(response => response),
        catchError(this.handleError('getData', []))
      );
  }

  /**
   * This is only for mocking save function
   * @param {*} url
   * @returns {Observable<any>}
   * @memberof DataService
   */
  saveData(url): Observable<any> {
    return this.http.get<any>(url)
      .pipe(
        tap(response => response),
        catchError(this.handleError('saveData', null))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
