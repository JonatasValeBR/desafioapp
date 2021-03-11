import { NgModule } from '@angular/core';
import { PessoasReadPageRoutingModule } from './pessoas-read-routing.module';

import { PessoasReadPage } from './pessoas-read.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    PessoasReadPageRoutingModule
  ],
  declarations: [PessoasReadPage]
})
export class PessoasReadPageModule {}
