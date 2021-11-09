import { Component, OnInit } from '@angular/core';
import { NasaService } from '@core/services/nasa.service';
import { ActivatedRoute } from '@angular/router';
import { Planet } from '@core/interfaces/planet.interface';
import { NgxSpinnerService } from 'ngx-spinner';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {
  public planet: Planet | any;

  constructor(
    private _restService: NasaService,
    private _activatedRoute: ActivatedRoute,
    private _spinner: NgxSpinnerService,
    private _domSanitizer: DomSanitizer
  ) {
    this.planet = {
      title: '',
      explanation: '',
      date: '',
      url: '',
      hdurl: '',
    };
  }

  ngOnInit(): void {
    this.showSpinner(this._spinner);

    this._activatedRoute.params.subscribe((params) => {
      this._restService.getPics(`&date=${params.date}`).subscribe(
        (response) => {
          this.planet = response;
          this.hideSpinner(this._spinner);
        },
        () => {
          this.hideSpinner(this._spinner);
        }
      );
    });
  }

  public safeMediaUrl(_mediaUrl: string) {
    return this._domSanitizer.bypassSecurityTrustResourceUrl(_mediaUrl);
  }

  private showSpinner(_spinnerParam: NgxSpinnerService): void {
    _spinnerParam.show();
  }

  private hideSpinner(_spinnerParam: NgxSpinnerService): void {
    setTimeout(() => {
      _spinnerParam.hide();
    }, 500);
  }
}
