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

   postPhoto(file: any){
    const contentFile = new FormData();
    // contentFile.append("file", uploadedFile.data, uploadedFile.fileName ? uploadedFile.fileName : "uploadedFile");

    return this.http.post<Photo>(`${this.url}`, file);
  }

}
