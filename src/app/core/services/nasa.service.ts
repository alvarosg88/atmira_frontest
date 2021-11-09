import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { CONSTANTS } from '@core/services/constants';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Planet } from '@core/interfaces/planet.interface';

@Injectable()
export class NasaService {
  constructor(private _http: HttpClient, private _snackbar: MatSnackBar) {}

  public getData(_dateRange: string): Observable<Planet | any> {
    return this._http.get(_dateRange).pipe(
      catchError((error) => {
        let errorMsg: string;
        if (error.error instanceof ErrorEvent) {
          errorMsg = `Error: ${error.error.message}`;
        } else {
          errorMsg = this.getServerErrorMessage(error);
        }

        this.openSnackBar(errorMsg);
        return throwError(errorMsg);
      })
    );
  }

  public openSnackBar(message: string) {
    this._snackbar.open(message, CONSTANTS.CLOSE_ALERT_BTN);
  }

  private getServerErrorMessage(_error: HttpErrorResponse): string {
    switch (_error.status) {
      case 404: {
        return `Not Found: ${_error.message}`;
      }
      case 403: {
        return `Access Denied: ${_error.message}`;
      }
      case 500: {
        return `Internal Server Error: ${_error.message}`;
      }
      default: {
        return `Unknown Server Error: ${_error.message}`;
      }
    }
  }
}
