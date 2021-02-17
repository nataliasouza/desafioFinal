import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Genero } from '../model/Genero.interface';
import { ProviderService } from '../providers/provider.service';

@Injectable({
  providedIn: 'root'
})
export class GeneroService extends ProviderService{

  constructor(private http: HttpClient) 
  { 
    super("Gender");
  }

  // GENEROS
  getGeneros() {
    let generos = this.http.get<any[]>(`${this.url}`);
    console.log(generos);
    return generos;
  }

  getGeneroById(id: string) {
    let descricaoGenero = this.http.get<Genero>(`${this.url}/${id}`);
    return descricaoGenero;
  }
}
