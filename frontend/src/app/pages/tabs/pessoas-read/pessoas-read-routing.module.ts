import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PessoasReadPage } from './pessoas-read.page';

const routes: Routes = [
  {
    path: '',
    component: PessoasReadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PessoasReadPageRoutingModule {}
