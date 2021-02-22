import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Postage } from '../model/Postage';
import { ProviderService } from '../providers/provider.service';

@Injectable({
  providedIn: 'root'
})
export class PostagemService extends ProviderService {

  constructor(private http: HttpClient) {
    super("Postage");
  }
  
  // POSTAGENS

  getPostagesById() {
    return this.http.get<any>(`${this.url}`);
  }

  postPostage(postagem: Postage) {
    return this.http.post<any>(`${this.url}`, postagem);
  }

  // LIKES

  postLike(id) {
    return this.http.post<any>(`${this.url}/Likes`, id);
  }

  postComments(id: number, comment: any) {
    return this.http.post<any>(`${this.url}/${id}/Comments`, comment);
  }

  getComments(id: number){
    return this.http.get<any>(`${this.url}/${id}/Comments`);
  }
}
