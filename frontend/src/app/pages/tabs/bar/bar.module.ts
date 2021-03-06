import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarPageRoutingModule } from './bar-routing.module';

import { BarPage } from './bar.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    BarPageRoutingModule
  ],
  declarations: [BarPage]
})
export class BarPageModule {}
