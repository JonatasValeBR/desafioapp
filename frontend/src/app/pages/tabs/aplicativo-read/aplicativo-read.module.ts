import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AplicativoReadPageRoutingModule } from './aplicativo-read-routing.module';

import { AplicativoReadPage } from './aplicativo-read.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AplicativoReadPageRoutingModule
  ],
  declarations: [AplicativoReadPage]
})
export class AplicativoReadPageModule {}
