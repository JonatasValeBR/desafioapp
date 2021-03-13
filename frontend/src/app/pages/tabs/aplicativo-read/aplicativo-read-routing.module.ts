import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AplicativoReadPage } from './aplicativo-read.page';

const routes: Routes = [
  {
    path: '',
    component: AplicativoReadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AplicativoReadPageRoutingModule {}
