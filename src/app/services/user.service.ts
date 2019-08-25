import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { User } from '../models/user';
import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private configUrl = "https://localhost:5001/api/user"

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User[]>(this.configUrl)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  getUser(symbolNo: number) {
    return this.http.get<User>(`${this.configUrl}/${symbolNo}`)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  addUser(user: User) {
    return this.http.post(
      this.configUrl, user
    ).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  delteUser(symbolNo: number) {
    return this.http.delete(
      `${this.configUrl}/${symbolNo}`
    ).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  updateUser(user: User) {
    return this.http.put(
      `${this.configUrl}/${1}`, user
    ).pipe(
      retry(3), // retry a failed request up to 3 times
      catchError(this.handleError) // then handle the error
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
