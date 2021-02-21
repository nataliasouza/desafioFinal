import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-time-line',
  templateUrl: './time-line.component.html',
  styleUrls: ['./time-line.component.scss']
})
export class TimeLineComponent implements OnInit {

 postagens: any;

  constructor(
    private usuarioService: UsuarioService,
    private toastr: ToastrService
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

  onError(error) {
    this.toastr.error('Erro!', `Alguma coisa deu errado. ${error}`);
  }
}
