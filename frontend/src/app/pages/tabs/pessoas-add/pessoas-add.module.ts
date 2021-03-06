import { NgModule } from '@angular/core';
import { PessoasAddPageRoutingModule } from './pessoas-add-routing.module';

import { PessoasAddPage } from './pessoas-add.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    PessoasAddPageRoutingModule
  ],
  declarations: [PessoasAddPage]
})
export class PessoasAddPageModule {}
