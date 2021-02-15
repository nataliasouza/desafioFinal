import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Genero } from 'src/app/model/Genero.interface';
import { Usuario } from 'src/app/model/Usuario.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor( private http: HttpClient ) { }

  API_URL = environment.API_URL;
  API_ORIGINAL = environment.API_ORIGINAL;

 // GENEROS
  getGeneros(){
    let generos = this.http.get<Genero[]>(this.API_URL + '/genero');
    return generos;
  }

  getGeneroById(id: string) {
    let descricaoGenero = this.http.get<Genero>(this.API_URL + `/genero/${id}`);
    return descricaoGenero;
  }

 // LOGIN
login(formData){
  return this.http.post<Usuario>(this.API_ORIGINAL + '/Login', formData);
}

 // USUARIOS
  getUsuarios() {
    let usuarios = this.http.get<Usuario[]>(this.API_URL + '/User');
    return usuarios;
  }

  getUsuarioById(id: string) {
    let usuario = this.http.get<Usuario>(this.API_URL + `/User/${id}`);
    return usuario;
  }

  postUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(this.API_ORIGINAL + '/User', usuario);
  }

  updateUsuario(id: string, usuario: Usuario) {
    return this.http.put<Usuario>(this.API_URL + `/User/${id}`, usuario);
  }

  deleteUsuario(id: string) {
    return this.http.delete<Usuario>(this.API_URL + `/User/${id}`);
  }

  // getContaByIdCLiente(idCliente: any) {
  //   return this.http.get<Conta[]>(this.API_URL + `/contas?idUsuario=${idCliente}`);
  // }
}
