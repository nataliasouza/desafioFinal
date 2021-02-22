import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './cadastro/cadastro.component';
import { EquipeComponent } from './equipe/equipe.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { ErrorInterceptor } from './helpers/error.interceptor';
import { JwtInterceptor } from './helpers/jwt.inter';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfilePostComponent } from './profile-post/profile-post.component';
import { UsuarioService } from './services/usuario/usuario.service';
import { PerfilComponent } from './perfil/perfil.component';
import { CaixaPostagemComponent } from './caixaPostagem/caixa-postagem/caixa-postagem.component';
import { TimeLineComponent } from './time-line/time-line.component';
import { MinhasPostagensComponent } from './minhas-postagens/minhas-postagens.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    CadastroComponent,
    ProfilePostComponent,
    EquipeComponent,
    PerfilComponent,
    CaixaPostagemComponent,
    TimeLineComponent,
    MinhasPostagensComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [
    UsuarioService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi:true},
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
