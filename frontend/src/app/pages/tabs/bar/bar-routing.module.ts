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
          {
            path:'edit/:id',
            loadChildren: () => import('../pessoas-edit/pessoas-edit.module').then( m => m.PessoasEditPageModule)
          },
          {
            path:'read/:id',
            loadChildren: () => import('../pessoas-read/pessoas-read.module').then( m => m.PessoasReadPageModule)
          }
        ]
      },
      {
        path: 'perfil',
        children:[
          {
            path:'',
            loadChildren: () => import('../perfil/perfil.module').then( m => m.PerfilPageModule)
          },
          {
            path:'read/:id',
            loadChildren: () => import('../perfil-read/perfil-read.module').then( m => m.PerfilReadPageModule)
          },
          {
            path:'attrb/:id',
            loadChildren: () => import('../perfil-attrb/perfil-attrb.module').then( m => m.PerfilAttrbPageModule)
          }
        ]
      },
      {
        path: 'aplicativo',
        children:[
          {
            path:'',
            loadChildren: () => import('../aplicativo/aplicativo.module').then( m => m.AplicativoPageModule)
          },
          {
            path: 'add/',
            loadChildren: () => import('../aplicativos-add/aplicativos-add.module').then( m => m.AplicativosAddPageModule)
          },
          {
            path: 'edit/:id',
            loadChildren: () => import('../aplicativo-edit/aplicativo-edit.module').then( m => m.AplicativoEditPageModule)
          },
          {
            path: 'read/:id',
            loadChildren: () => import('../aplicativo-read/aplicativo-read.module').then( m => m.AplicativoReadPageModule)
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


