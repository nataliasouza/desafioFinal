import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../services/usuario/usuario.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  // onSubmit(form:Ngform){
  //   this.usuarioService.login(form.value)
  //   .subscribe((res.any) => {
  //     localStorage.setItem('accessToken', res.accessToken);
  //     this.router.navigateByUrl('/home')
  //   },
  //   err => {
  //     if(err.status == 400)
  //     this.toastr.error('Usuario ou senha incorretos.')
  //   }
  // }

}
