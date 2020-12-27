import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './auth/login/login.component';
import { MenuComponent } from './sistema/menu/menu.component';
import { CriarNoticiaComponent } from './sistema/noticia/criar-noticia/criar-noticia.component';
import { EditarNoticiaComponent } from './sistema/noticia/editar-noticia/editar-noticia.component';
import { VerNoticiaComponent } from './sistema/noticia/ver-noticia/ver-noticia.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'noticia', component: CriarNoticiaComponent },
  { path: 'editarnoticia/:titulo', component: EditarNoticiaComponent },
  { path: 'vernoticia/:titulo', component: VerNoticiaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
