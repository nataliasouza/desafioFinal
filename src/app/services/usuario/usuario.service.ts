import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/services/model/Usuario.interface';
import { ProviderService } from '../providers/provider.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends ProviderService{

  constructor( private http: HttpClient ) 
  { 
    super("User");

  }


 // USUARIOS
  getUsuarios() {
    let usuarios = this.http.get<Usuario[]>(`${this.url}`);
    return usuarios;
  }

  getUsuarioById(id: string) {
    let usuario = this.http.get<Usuario>(`${this.url}/${id}`);
    return usuario;
  }

  postUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(`${this.url}`, usuario);
  }

  updateUsuario(id: string, usuario: Usuario) {
    return this.http.put<Usuario>(`${this.url}/${id}`, usuario);
  }


  // getContaByIdCLiente(idCliente: any) {
  //   return this.http.get<Conta[]>(this.API_URL + `/contas?idUsuario=${idCliente}`);
  // }
}
