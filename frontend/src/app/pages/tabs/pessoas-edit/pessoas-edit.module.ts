import { NgModule } from '@angular/core';
import { PessoasEditPageRoutingModule } from './pessoas-edit-routing.module';
import { PessoasEditPage } from './pessoas-edit.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    PessoasEditPageRoutingModule
  ],
  declarations: [PessoasEditPage]
})
export class PessoasEditPageModule {}
