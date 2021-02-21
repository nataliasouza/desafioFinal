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

  getUsuarioById(id: number) {
    return  this.http.get<any>(`${this.url}/${id}`);
  }

  postUsuario(usuario: Usuario) {
    return this.http.post<Usuario>(`${this.url}`, usuario);
  }

  updateUsuario(id: string, usuario: Usuario) {
    return this.http.put<Usuario>(`${this.url}/${id}`, usuario);
  }

 getTimeLine(){
   return this.http.get<any>(`${this.url}/TimeLine`)
 }

  // getContaByIdCLiente(idCliente: any) {
  //   return this.http.get<Conta[]>(this.API_URL + `/contas?idUsuario=${idCliente}`);
  // }
}
