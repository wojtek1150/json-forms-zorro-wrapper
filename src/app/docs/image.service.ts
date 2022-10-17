import { Observable, Observer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ImageRendererService {
  constructor(private httpClient: HttpClient) {}

  uploadImage(file: File): Observable<{ url: string }> {
    const formData = new FormData();
    formData.append('files', file);

    return new Observable((observer: Observer<{ url: string }>) => {
      const reader = new FileReader();
      reader.onload = event => {
        const img = new Image();
        img.src = event.target.result as string;

        img.onload = () => {
          observer.next({ url: event.target.result as string });
          observer.complete();
        };
      };

      // little workaround, ng-zorro says that file param is a UploadFile type, but debugger shows its native File object:
      // https://github.com/NG-ZORRO/ng-zorro-antd/issues/4744
      reader.readAsDataURL(file as unknown as File);
    });
  }

  deleteImage(imageUrl: string): Observable<any> {
    return this.httpClient.request('delete', window.location.href, { body: { url: imageUrl } });
  }
}
