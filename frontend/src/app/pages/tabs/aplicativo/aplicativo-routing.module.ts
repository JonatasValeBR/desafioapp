import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AplicativoPage } from './aplicativo.page';

const routes: Routes = [
  {
    path: '',
    component: AplicativoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AplicativoPageRoutingModule {}
