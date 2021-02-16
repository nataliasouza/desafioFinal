import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/providers/authentication/authentication.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthenticationService,
              private router: Router,
              private toastr: ToastrService,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.inicializaForm();
  }

  inicializaForm() {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  onSubmit() {
    if (!this.loginForm.valid)
    {
      return;
    }
    console.log(this.loginForm.value.login, this.loginForm.value.password);
    this.authService
        .login(this.loginForm.value.login, this.loginForm.value.password)
        .subscribe((user) =>  {
          this.router.navigate(['/profile-post']);
        }, (error) => 
        {
         this.toastr.error("Não foi possivel fazer o login, tente novamente!")
        });
  }

}
