import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoasEditPage } from './pessoas-edit.page';

const routes: Routes = [
  {
    path: '',
    component: PessoasEditPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PessoasEditPageRoutingModule {}
