import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PerfilAttrbPageRoutingModule } from './perfil-attrb-routing.module';

import { PerfilAttrbPage } from './perfil-attrb.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    PerfilAttrbPageRoutingModule
  ],
  declarations: [PerfilAttrbPage]
})
export class PerfilAttrbPageModule {}
