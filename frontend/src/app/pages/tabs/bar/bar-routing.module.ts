import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarPage } from './bar.page';

const routes: Routes = [
  {
    path: 'menu',
    component: BarPage,
    children: [
      {
        path: 'pessoa',
        children:[
          {
            path:'',
            loadChildren: () => import('../pessoa/pessoa.module').then( m => m.PessoaPageModule)
          },
          {
            path:'add',
            loadChildren: () => import('../pessoas-add/pessoas-add.module').then( m => m.PessoasAddPageModule)
          },
        ]
      },
      {
        path: 'perfil',
        children:[
          {
            path:'',
            loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule)
          }
        ]
      },
      {
        path: 'aplicativo',
        children:[
          {
            path:'',
            loadChildren: () => import('../aplicativo/aplicativo.module').then( m => m.AplicativoPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/menu/pessoa',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/menu/pessoa',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarPageRoutingModule {}


