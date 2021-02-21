import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Postage } from '../model/Postage.Interface';
import { ProviderService } from '../providers/provider.service';

@Injectable({
  providedIn: 'root'
})
export class PostagemService extends ProviderService{

  constructor(private http: HttpClient )
  {
    super("Postage");

  }

 // POSTAGENS

  getPostagesById(id: string) {
    let postagem = this.http.get<any>(`${this.url}`);
    return postagem;
  }

  postPostage(postagem: Postage) {
    return this.http.post<any>(`${this.url}`, postagem);
  }
}
