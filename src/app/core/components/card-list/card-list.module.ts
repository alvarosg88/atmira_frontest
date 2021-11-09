import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { NoResultsComponent } from '../no-results/no-results.component';
import { CardListComponent } from './card-list.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [CardListComponent, CardComponent, NoResultsComponent],
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
    RouterModule,
    NgxSpinnerModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [CardListComponent],
})
export class CardListModule {}
