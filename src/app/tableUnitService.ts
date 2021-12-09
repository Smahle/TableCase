import { HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import { Injectable } from "@angular/core";

import { Observable, throwError, BehaviorSubject, map } from "rxjs";

import { catchError, tap } from "rxjs";
import { TableUnits } from "./tableUnit";

@Injectable({
    providedIn: 'root'
})

export class TableUnitService{
    /* angular cli finner denne lokasjonen i angular.json assets arrayen /*\\*/
    private tableUnitUrl = 'api/tableUni';

    httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
      };

    constructor(private http: HttpClient){}

    private subject = new BehaviorSubject<TableUnits[]>([]);

    items$ = this.subject.asObservable();

    getTableUnits(): Observable<TableUnits[]>{
            console.log("getURL"+this.tableUnitUrl)
        /* denne metoden mapper responsen til en array av tableUnits */
        return this.http.get<TableUnits[]>(this.tableUnitUrl).pipe(
            tap(data=> console.log('Retrived units:', JSON.stringify(data))),
            catchError(this.handleError)
            );
            
        }
    addTableUnit(tableUnit: TableUnits): Observable<TableUnits> {
        return this.http.post<TableUnits>(this.tableUnitUrl, tableUnit, this.httpOptions);
    
    }


    private handleError(err: HttpErrorResponse): Observable<never> {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        let errorMessage = '';
        if (err.error instanceof ErrorEvent) {
          // A client-side or network error occurred. Handle it accordingly.
          errorMessage = `An error occurred: ${err.error.message}`;
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
        }
        console.error(errorMessage);
        return throwError(errorMessage);
    }
    
    


}