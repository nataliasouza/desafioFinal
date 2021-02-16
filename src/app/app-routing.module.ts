import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EquipeComponent } from './equipe/equipe.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CadastroComponent } from './cadastro/cadastro.component';
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
  path: 'equipe',
  component: EquipeComponent,
},{
  path: 'cadastro',
  component: CadastroComponent,
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
