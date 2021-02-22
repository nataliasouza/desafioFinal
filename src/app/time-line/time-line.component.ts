import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostagemService } from '../services/postagens/postagem.service';
import { AuthenticationService } from '../services/providers/authentication/authentication.service';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit {

 postagens: any;
 url: string;
 foto: string;
 jti: any;
 email: string;
 usuario: string;
 commentForm: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private usuarioService: UsuarioService,
    private postService: PostagemService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
     this.getTimeLine();
     this.carregaInfoUsuario();
  }

  inicializaFormPostagem() {
    this.commentForm = this.fb.group({
      text: ['', Validators.required]
    })
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
   
  getTimeLine() {
    this.usuarioService.getTimeLine()
      .subscribe(
        response => this.onSuccesTimeLine(response),
        error => this.onError(error)
      )
  }

  onSuccesTimeLine(response) {
    this.postagens = response;
  }

  curtir(id){
    this.postService.postLike(id)
    .subscribe(
      response => response,
      error => this.onError(error)
    )
  }

  comentar(id){
    this.postService.postComments(id, this.commentForm.value)
    .subscribe(
      response => response,
      error => this.onError(error)
    )
  }

  onError(error) {
    this.toastr.error('Erro!', `Alguma coisa deu errado. ${error}`);
  }
}
