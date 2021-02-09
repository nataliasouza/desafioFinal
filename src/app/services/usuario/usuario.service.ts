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

  getGeneros(){
    let generos = this.http.get<Genero[]>(this.API_URL + '/genero');
    return generos;
  }

  getGeneroById(id: string) {
    let descricaoGenero = this.http.get<Genero>(this.API_URL + `/genero/${id}`);
    return descricaoGenero;
  }

  getUsuarios() {
    let usuarios = this.http.get<Usuario[]>(this.API_URL + '/usuario');
    return usuarios;
  }

  getUsuarioById(id: string) {
    let usuario = this.http.get<Usuario>(this.API_URL + `/usuario/${id}`);
    return usuario;
  }

  postUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(this.API_URL + '/usuario', usuario);
  }

  updateUsuario(id: string, usuario: Usuario) {
    return this.http.put<Usuario>(this.API_URL + `/usuario/${id}`, usuario);
  }

  deleteUsuario(id: string) {
    return this.http.delete<Usuario>(this.API_URL + `/usuario/${id}`);
  }

  // getContaByIdCLiente(idCliente: any) {
  //   return this.http.get<Conta[]>(this.API_URL + `/contas?idUsuario=${idCliente}`);
  // }
}
