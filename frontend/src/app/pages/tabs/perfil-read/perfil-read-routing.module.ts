import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilReadPage } from './perfil-read.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilReadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilReadPageRoutingModule {}
