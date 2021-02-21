import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMonitor } from 'events';
import { ToastrService } from 'ngx-toastr';
import { PostagemService } from 'src/app/services/postagens/postagem.service';
import { AuthenticationService } from 'src/app/services/providers/authentication/authentication.service';

@Component({
  selector: 'app-caixa-postagem',
  templateUrl: './caixa-postagem.component.html',
  styleUrls: ['./caixa-postagem.component.scss']
})
export class CaixaPostagemComponent implements OnInit {

  postForm: FormGroup;
  constructor( 
    private fb: FormBuilder,
    private router: Router,
    private postagemService: PostagemService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.inicializaFormPostagem();
  }

  inicializaFormPostagem() {
    this.postForm = this.fb.group({
      text: ['', Validators.required],
      foto: [''],
    })
  }

  onSubmit() {
    this.postagemService.postPostage(this.postForm.value)
      .subscribe(
        response => this.onSuccessNovoPost(),
        error => this.onError(error),
      )
  }
  
  onSuccessNovoPost() {
    this.toastr.success('Sucesso!', 'Post criado com sucesso.');
    this.router.navigate(['/profile-post']);
  }

  onError(error) {
    this.toastr.error('Erro!', `Alguma coisa deu errado. ${error}`);
  }
}
