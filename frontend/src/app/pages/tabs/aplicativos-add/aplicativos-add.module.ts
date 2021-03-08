import { NgModule } from '@angular/core';

import { AplicativosAddPageRoutingModule } from './aplicativos-add-routing.module';

import { AplicativosAddPage } from './aplicativos-add.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    AplicativosAddPageRoutingModule
  ],
  declarations: [AplicativosAddPage]
})
export class AplicativosAddPageModule {}
