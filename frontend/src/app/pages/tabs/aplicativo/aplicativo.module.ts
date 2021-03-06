import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AplicativoPageRoutingModule } from './aplicativo-routing.module';

import { AplicativoPage } from './aplicativo.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AplicativoPageRoutingModule
  ],
  declarations: [AplicativoPage]
})
export class AplicativoPageModule {}
