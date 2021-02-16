import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { GeneroService } from '../services/genero/genero.service';
import { Genero } from '../services/model/Genero.interface';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  generos: Genero[];
  usuarioForm: FormGroup;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private generoService: GeneroService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.carregarGeneros();
    this.inicializaForm();
  }

  inicializaForm() {
    this.usuarioForm = this.fb.group({
      name: ['', Validators.required],
      genderId: ['', Validators.required],
      photo: ['', Validators.required],
      birthday: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  carregarGeneros() {
    this.generoService.getGeneros()
      .subscribe(
        response => this.onSuccess(response),
        error => this.onError()
      );
  }

  onSuccess(response: Genero[]) {
    this.generos = response;
  }

  
  validateAllFormFiels(form: FormGroup) {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched();
      } else if (control instanceof FormGroup) {
        this.validateAllFormFiels(control);
      }
    });
  }

  onSubmit() {
    if (this.usuarioForm.invalid) {
      this.validateAllFormFiels(this.usuarioForm);
      return;
    }
    this.cadastro();
  }


  cadastro() {  
    this.usuarioService.postUsuario(this.usuarioForm.value)
      .subscribe(
        response => this.onSuccessNovoCliente(),
        error => this.onError(),
      )
  }
  onSuccessNovoCliente() {
    this.toastr.success('Sucesso!', 'Usuário criado com sucesso.');
    this.router.navigate(['']);
  }

  onError() {
    this.toastr.error('Erro!', 'Alguma coisa deu errado.');
  }

  exibeErro(nomeControle: string) {
    if (!this.usuarioForm.get(nomeControle)) {
      return false;
    }
    return this.usuarioForm.get(nomeControle).invalid && this.usuarioForm.get(nomeControle).touched;
  }

}




