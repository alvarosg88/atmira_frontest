import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardListComponent } from '@core/components/card-list/card-list.component';
import { DetailComponent } from '@core/components/detail/detail.component';

const routes: Routes = [
  {
    path: '',
    component: CardListComponent,
    pathMatch: 'full',
  },
  {
    path: 'detail/:date',
    component: DetailComponent,
    pathMatch: 'prefix',
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
