import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PessoaPageRoutingModule } from './pessoa-routing.module';

import { PessoaPage } from './pessoa.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    PessoaPageRoutingModule
  ],
  declarations: [PessoaPage]
})
export class PessoaPageModule {}
