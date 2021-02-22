import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Router, RouterState, RouterStateSnapshot } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PostagemService } from '../services/postagens/postagem.service';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit {

 postagens: any;
 url: string;

  constructor(
    private usuarioService: UsuarioService,
    private postService: PostagemService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
     this.getTimeLine();
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

  onError(error) {
    this.toastr.error('Erro!', `Alguma coisa deu errado. ${error}`);
  }
}
