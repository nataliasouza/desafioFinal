import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserLogged } from '../services/model/userLogged';
import { PostagemService } from '../services/postagens/postagem.service';
import { AuthenticationService } from '../services/providers/authentication/authentication.service';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.scss']
})
export class ProfilePostComponent implements OnInit {

  foto: string;
  jti: any;
  email: string;
  usuario: string;
  postForm: FormGroup;
  postagens: any;

  constructor(
    private authenticationService: AuthenticationService,
    private usuarioService: UsuarioService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.carregaInfoUsuario();
  }

  carregaInfoUsuario() {
    this.usuario = this.authenticationService.userInformations.unique_name;
    this.email = this.authenticationService.userInformations.email;
    this.jti = this.authenticationService.userInformations.jti;

    this.getUsuario();
  }

  getUsuario() {
    this.usuarioService.getUsuarioById(this.authenticationService.userInformations.jti)
      .subscribe(
        response => this.onSuccessFoto(response.photo),
        error => this.onError(error)
      )
  }

  onSuccessFoto(response) {
    this.foto = response;
  }

   onError(error) {
    this.toastr.error('Erro!', `Alguma coisa deu errado. ${error}`);
  }

}
