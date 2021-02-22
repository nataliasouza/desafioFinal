import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PostagemService } from '../services/postagens/postagem.service';

@Component({
  selector: 'app-minhas-postagens',
  templateUrl: './minhas-postagens.component.html',
  styleUrls: ['./minhas-postagens.component.scss']
})
export class MinhasPostagensComponent implements OnInit {

  postagens: any;

  constructor(
    private postService: PostagemService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getMinhasPostagens();
  }


  getMinhasPostagens() {
    this.postService.getPostagesById()
      .subscribe(
        response => this.onSuccesPostagens(response),
        error => this.onError(error)
      )
  }

  onSuccesPostagens(response) {
    this.postagens = response;
  }

  curtir(){
    this.postService.postLike(this.postagens.id)
    .subscribe(
      response => response,
      error => this.onError(error)
    )
  }

  onError(error) {
    this.toastr.error('Erro!', `Alguma coisa deu errado. ${error}`);
  }
}
