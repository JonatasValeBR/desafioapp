import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AplicativoEditPage } from './aplicativo-edit.page';

const routes: Routes = [
  {
    path: '',
    component: AplicativoEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AplicativoEditPageRoutingModule {}
