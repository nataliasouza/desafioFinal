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

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private postService: PostagemService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.carregaInfoUsuario();
    this.inicializaFormPostagem();
    console.log(this.carregaInfoUsuario())

  }

  carregaInfoUsuario() {
    this.usuario = this.authenticationService.userInformations.unique_name;
    this.email = this.authenticationService.userInformations.email;
    this.jti = this.authenticationService.userInformations.jti;
    
    this.usuarioService.getUsuarioById(this.authenticationService.userInformations.jti)
    .subscribe(
      response => this.onSuccessFoto(response.photo),
      error => this.onError()
    )
  
  }

  onSuccessFoto(response){
    this.foto = response;
    console.log(this.foto);
  }

  inicializaFormPostagem() {
    this.postForm = this.fb.group({
      text: ['', Validators.required],
      foto: [''],
    })
  }

  postar() {  
    this.postService.postPostage(this.postForm.value)
      .subscribe(
        response => this.onSuccessNovoPost(),
        error => this.onError(),
      )
  }
  onSuccessNovoPost() {
    this.toastr.success('Sucesso!', 'Post criado com sucesso.');
    this.router.navigate(['']);
  }

  onError() {
    this.toastr.error('Erro!', 'Alguma coisa deu errado.');
  }

}
