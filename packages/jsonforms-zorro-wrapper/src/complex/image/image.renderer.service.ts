import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class JFZImageRendererService {
  constructor(private httpClient: HttpClient) {}

  uploadImages(url: string, formData: FormData): Observable<{ url: string }> {
    return this.httpClient.post<{ url: string }>(url, formData);
  }

  deleteImage(url: string, imageUrl: string): Observable<any> {
    return this.httpClient.request('delete', url, { body: { url: imageUrl } });
  }
}
