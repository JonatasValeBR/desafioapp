import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PerfilAttrbPage } from './perfil-attrb.page';

const routes: Routes = [
  {
    path: '',
    component: PerfilAttrbPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PerfilAttrbPageRoutingModule {}
