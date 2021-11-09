import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DetailComponent } from './components/detail/detail.component';
import { CardListModule } from './components/card-list/card-list.module';
import { RouterModule } from '@angular/router';
import { MatSnackBarModule, MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [DetailComponent],
  imports: [CommonModule, CardListModule, RouterModule, MatSnackBarModule, NgxSpinnerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{ provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: { duration: 10000 } }],
  exports: [CardListModule],
})
export class CoreModule {
  /* make sure CoreModule is imported only by the AppModule and noone else */
  constructor(@Optional() @SkipSelf() presentInParent: CoreModule) {
    if (presentInParent) {
      throw new Error('CoreModule is already loaded. Import only in AppModule');
    }
  }
}
