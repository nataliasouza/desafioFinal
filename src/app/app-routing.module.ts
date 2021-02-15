import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PainelUsuarioComponent } from './painel-usuario/painel-usuario.component';
import { ProfilePostComponent } from './profile-post/profile-post.component';




const routes: Routes = [ {
  path: '',
  component: HomeComponent
},{
  path: 'home',
  component: HomeComponent,
},{
  path: 'login',
  component: LoginComponent,
},{
  path: 'profile-post',
  component: ProfilePostComponent,

},{
  path: 'painel-usuario',
  component: PainelUsuarioComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
