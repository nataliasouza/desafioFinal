import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Photo } from '../model/Photo.interface';
import { ProviderService } from '../providers/provider.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService extends ProviderService {

   
  constructor(private http: HttpClient) 
  {
    super("Upload");
   }

   postPhoto(uploadFile: any){
    const formData = new FormData();

    formData.append('file', uploadFile.data, uploadFile.fileName ? uploadFile.fileName : "uploadFile");

    return this.http.post<any>(`${this.url}`, formData);
  }

}
