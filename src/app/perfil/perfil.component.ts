import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/providers/authentication/authentication.service';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  genero: string;
  foto: string;
  dataNasc: string;
  jti: any;
  email: string;
  usuario: string;

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
        response => this.onSuccessFoto(response),
        error => this.onError(error)
      )
  }

  onSuccessFoto(response) {
    this.foto = response.photo;
    this.genero = response.genderId;
    this.dataNasc = response.birthday;
    console.log("Foto: " + this.foto + "GenderId " + this.genero + "Data: " + this.dataNasc);
  }

   onError(error) {
    this.toastr.error('Erro!', `Alguma coisa deu errado. ${error}`);
  }

}
