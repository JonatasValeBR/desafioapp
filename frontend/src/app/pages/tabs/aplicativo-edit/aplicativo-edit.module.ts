import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AplicativoEditPageRoutingModule } from './aplicativo-edit-routing.module';

import { AplicativoEditPage } from './aplicativo-edit.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AplicativoEditPageRoutingModule
  ],
  declarations: [AplicativoEditPage]
})
export class AplicativoEditPageModule {}
