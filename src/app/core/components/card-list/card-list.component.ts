import { Component, OnInit } from '@angular/core';
import { NasaService } from '@core/services/nasa.service';
import { Planet } from '@core/interfaces/planet.interface';
import { CONSTANTS } from '@core/services/constants';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import moment from 'moment';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.scss'],
})
export class CardListComponent implements OnInit {
  public planets$!: Observable<Planet[]>;
  public errorMsg = '';
  public maxDate: Date | undefined;

  private dFormat = CONSTANTS.DATE_FORMAT;

  private endDate: object;
  private startDate: object;

  private startDateStr: string;
  private endDateStr: string;

  constructor(private _restService: NasaService, private _spinner: NgxSpinnerService) {
    this.planets$ = new Observable();
    this.maxDate = new Date();

    this.endDate = moment().subtract(1, 'days');
    this.startDate = moment().subtract(6, 'days');

    this.startDateStr = moment(this.startDate).format(this.dFormat)!;
    this.endDateStr = moment(this.endDate).format(this.dFormat);
  }

  ngOnInit(): void {
    this.loadData(this.getAPIStr({ _dateStart: this.startDateStr, _dateEnd: this.endDateStr }));
  }

  public dateChanged(_event: any) {
    let paramDate = moment(_event.target.value);
    this.endDateStr = paramDate.clone().subtract(1, 'days').format(this.dFormat);
    this.startDateStr = paramDate.clone().subtract(6, 'days').format(this.dFormat);

    this.loadData(this.getAPIStr({ _dateStart: this.startDateStr, _dateEnd: this.endDateStr }));
  }

  private loadData(_dateRange: string): void {
    this.showSpinner(this._spinner);
    this.planets$ = this._restService.getData(_dateRange).pipe(
      catchError((error) => {
        this.errorMsg = error.message;
        this.hideSpinner(this._spinner);
        return of([]);
      })
    );
    this.hideSpinner(this._spinner);
  }

  private showSpinner(_spinnerParam: NgxSpinnerService): void {
    _spinnerParam.show();
  }

  private hideSpinner(_spinnerParam: NgxSpinnerService): void {
    setTimeout(() => {
      _spinnerParam.hide();
    }, 2000);
  }

  private getAPIStr({ _dateStart, _dateEnd }: { _dateStart: string; _dateEnd: string }): string {
    return `&start_date=${_dateStart}&end_date=${_dateEnd}`;
  }
}
