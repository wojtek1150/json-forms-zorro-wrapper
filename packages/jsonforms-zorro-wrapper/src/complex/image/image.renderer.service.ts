import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class JFZImageRendererService {
  constructor(private httpClient: HttpClient) {}

  uploadImage(file: File, uploadUrl: string): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('files', file as unknown as File);

    return this.httpClient.post<{ url: string }>(uploadUrl, formData);
  }

  deleteImage(imageUrl: string, deleteUrl: string): Observable<any> {
    return this.httpClient.request('delete', deleteUrl, { body: { url: imageUrl } });
  }
}
