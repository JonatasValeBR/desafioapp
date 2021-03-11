import { NgModule } from '@angular/core';
import { PerfilReadPageRoutingModule } from './perfil-read-routing.module';
import { PerfilReadPage } from './perfil-read.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    PerfilReadPageRoutingModule
  ],
  declarations: [PerfilReadPage]
})
export class PerfilReadPageModule {}
