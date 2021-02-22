import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostagemService } from '../services/postagens/postagem.service';
import { AuthenticationService } from '../services/providers/authentication/authentication.service';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-minhas-postagens',
  templateUrl: './minhas-postagens.component.html',
  styleUrls: ['./minhas-postagens.component.scss']
})
export class MinhasPostagensComponent implements OnInit {

  postagens: any;
  foto: string;
  jti: any;
  email: string;
  usuario: string;

  constructor(
    private postService: PostagemService,
    private usuarioService: UsuarioService,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getMinhasPostagens();
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

  getMinhasPostagens() {
    this.postService.getPostagesById()
      .subscribe(
        response => this.onSuccesPostagens(response),
        error => this.onError(error)
      )
  }

  onSuccesPostagens(response) {
    this.postagens = response;
  }

  curtir(id){
    this.postService.postLike(id)
    .subscribe(
      response => response,
      error => this.onError(error)
    )
  }

  onError(error) {
    this.toastr.error('Erro!', `Alguma coisa deu errado. ${error}`);
  }
}
