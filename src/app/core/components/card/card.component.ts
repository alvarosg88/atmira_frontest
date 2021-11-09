import { Component, Input } from '@angular/core';
import { Planet } from '@core/interfaces/planet.interface';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  @Input() planet: Planet = {
    title: '',
    explanation: '',
    date: '',
    url: '',
    hdurl: '',
    media_type: '',
  };

  constructor(private _domSanitizer: DomSanitizer) {}

  public safeMediaUrl(_mediaUrl: string) {
    return this._domSanitizer.bypassSecurityTrustResourceUrl(_mediaUrl);
  }
}
