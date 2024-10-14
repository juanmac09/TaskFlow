import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  // Method to make a GET request
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url).pipe(
      catchError(this.handleError) 
    );
  }

  // Method to make a POST request
  post<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(url, body).pipe(
      catchError(this.handleError) 
    );
  }

  // Method to make a PUT request
  put<T>(url: string, body: any): Observable<T> {
    return this.http.put<T>(url, body).pipe(
      catchError(this.handleError) 
    );
  }

  // Method to make a DELETE request
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url).pipe(
      catchError(this.handleError) 
    );
  }

  // Handle errors
  private handleError(error: HttpErrorResponse) {

    let errorMessage = 'An unexpected error occurred.';

    if (error.error instanceof ErrorEvent) {
  
      errorMessage = `Error: ${error.error.message}`;
    } else {
      
      errorMessage = `Error code: ${error.status}\nMessage: ${error.message}`;
    }

    
    
    return throwError(() => new Error(errorMessage));
  }
}
