import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { errorMonitor } from 'events';
import { ToastrService } from 'ngx-toastr';
import { PostagemService } from 'src/app/services/postagens/postagem.service';
import { AuthenticationService } from 'src/app/services/providers/authentication/authentication.service';
import { UploadService } from 'src/app/services/upload/upload.service';

@Component({
  selector: 'app-caixa-postagem',
  templateUrl: './caixa-postagem.component.html',
  styleUrls: ['./caixa-postagem.component.scss']
})
export class CaixaPostagemComponent implements OnInit {

  postForm: FormGroup;
  public selectedFile: File = null;
  public files: Array<any> = new Array<any>();
  url: string = '';

  constructor( 
    private fb: FormBuilder,
    private router: Router,
    private postagemService: PostagemService,
    private toastr: ToastrService,
    private uploadService: UploadService,) { }

  ngOnInit(): void {
    this.inicializaFormPostagem();
  }

  inicializaFormPostagem() {
    this.postForm = this.fb.group({
      text: ['', Validators.required],
      foto: [this.url],
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
    this.router.navigateByUrl('/app-time-line', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/profile-post']);
  }); 
  }

  onError(error) {
    this.toastr.error('Erro!', `Alguma coisa deu errado. ${error}`);
  }
  onSelectedFile(files: FileList) {
    if (files.length === 0)
      return;

    this.selectedFile = files.item(0);

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);

    reader.onload = function(event) {
      var urlResult = reader.result;
      var url = event.target.result;
      console.log(url + " Url " + urlResult);
    };

    this.files.push({ data: this.selectedFile, fileName: this.selectedFile.name });

    this.uploadService.postPhoto(this.files[0])
      .subscribe(
        (res) => {
          this.url = res.url,
            this.postForm.controls.foto.setValue(this.url)
        },
        (err) => {
          this.onError(err);
        });
  }
}
