import { ChangeDetectorRef, Component, EventEmitter } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '../../jsonForms';
import { Actions, and, optionIs, RankedTester, rankWith, uiTypeIs } from '@jsonforms/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { catchError, finalize, Observable, Observer, of, Subscription, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NzUploadXHRArgs } from 'ng-zorro-antd/upload/interface';

@Component({
  selector: 'ImageUploadRenderer',
  templateUrl: './image.renderer.html',
  styleUrls: ['./image.renderer.scss'],
})
export class ImageControlRenderer extends JsonFormsControl {
  uploadUrl: string;
  deleteUrl?: string;
  imageToEdit?: string;
  withHint: boolean = true;
  minImageWidth = 300;
  minImageHeight = 300;
  maxImageWidth = 9999;
  maxImageHeight = 9999;
  maxImageSizeMB = 8;
  removeImagesOnDestroy = false;

  removeImagesOnDestroyChange = new EventEmitter<boolean>();
  removedImageToEdit = new EventEmitter<string>();

  fileList: NzUploadFile[] = [];
  isLoading = false;
  previewButtonsConfig = { showRemoveIcon: true };
  allowedExtensions = ['image/jpeg', 'image/png', 'image/gif'];

  constructor(jsonformsService: JsonFormsAngularService, changeDetectorRef: ChangeDetectorRef, protected httpClient: HttpClient) {
    super(jsonformsService, changeDetectorRef);
  }

  private _imageUrl: string;

  set imageUrl(value: string) {
    if (this._imageUrl && this._imageUrl !== 'PENDING') {
      const oldUrl = this._imageUrl;
      this.removeImage(oldUrl);
    }
    this._imageUrl = value;
    if (this._imageUrl !== 'PENDING') {
      this.jsonFormsService.updateCore(Actions.update(this.propsPath, () => this._imageUrl));
      this.triggerValidation();
    }
  }

  override getEventValue = (value: any) => {
    if (value !== undefined && value !== this.imageToEdit) {
      return value;
    }
  };

  override mapAdditionalProps(props) {
    super.mapAdditionalProps(props);
  }

  beforeUpload = (file: NzUploadFile) => {
    return new Observable(observer => {
      this.validateImage(file).subscribe(result => {
        if (result) {
          observer.next(true);
        }
        observer.complete();
      });
    });
  };

  request = (item: NzUploadXHRArgs): Subscription => {
    console.log('request', item);
    this.isLoading = true;
    this.imageUrl = 'PENDING';
    const formData = new FormData();
    formData.append('files[]', item.file as unknown as File);

    console.log('dto', formData, formData.getAll('files[]'));

    return this.uploadImages(formData)
      .pipe(
        tap((response: { url: string }) => {
          console.log('tap', response);
          this.imageUrl = response.url;
        }),
        catchError(err => {
          console.log('catchError');
          this.error = err.error?.message || 'Sorry, your image cannot be uploaded. Please, try again later.';
          this.imageUrl = null;
          return of(err);
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  };

  handleChange(info: NzUploadChangeParam): void {
    console.log('handleChange', info);
    this.removeImagesOnDestroyChange.emit(true);
    const fileList = [
      ...info.fileList.map<NzUploadFile>(i => {
        return { ...i, status: 'done' };
      }),
    ];
    this.fileList = fileList.slice(-1);
  }

  handleRemoveFile = (): boolean => {
    this.imageUrl = null;
    this.fileList = [];
    return true;
  };

  clearAndRemove() {
    this.imageToEdit = null;
    this.handleRemoveFile();
  }

  removeImage(url: string): void {
    if (this.imageToEdit === url) {
      this.removedImageToEdit.emit(url);
    } else {
      this.httpClient.request<null>('delete', this.deleteUrl, { body: { url } }).subscribe();
    }
  }

  private initImageUrlInEditionMode(): void {
    this._imageUrl = this.imageToEdit;
    this.fileList = [
      {
        name: 'Uploaded image',
        uid: this.imageToEdit,
        thumbUrl: this.imageToEdit,
      },
    ];
  }

  private validateImage(file: NzUploadFile): Observable<string> {
    return new Observable((observer: Observer<string>) => {
      const hasValidExtension = this.allowedExtensions.includes(file.type);
      if (!hasValidExtension) {
        this.error = 'File has incorrect extension.';
        observer.complete();
        return;
      }

      const hasValidSize = file.size <= this.maxImageSizeMB * 1_000 * 1_000;
      if (!hasValidSize) {
        this.error = `Image has to be smaller than ${this.maxImageSizeMB}MB.`;
        observer.complete();
        return;
      }

      const reader = new FileReader();
      reader.onload = event => {
        const img = new Image();
        img.src = event.target.result as string;

        img.onload = () => {
          const hasValidMinDimensions = img.width >= this.minImageWidth && img.height >= this.minImageHeight;
          if (!hasValidMinDimensions) {
            this.error = `Image has to be bigger than ${this.minImageHeight}x${this.minImageWidth}.`;
            observer.complete();
            return;
          }
          const hasValidMaxDimensions = img.width <= this.maxImageHeight && img.height <= this.maxImageHeight;
          if (!hasValidMaxDimensions) {
            this.error = `Image has to be smaller than ${this.maxImageHeight}x${this.maxImageWidth}.`;
            observer.complete();
            return;
          }
          observer.next(event.target.result as string);
          observer.complete();
        };
      };

      // little workaround, ng-zorro says that file param is a UploadFile type, but debugger shows it's native File object:
      // https://github.com/NG-ZORRO/ng-zorro-antd/issues/4744
      reader.readAsDataURL(file as unknown as File);
    });
  }

  private uploadImages(formData: FormData): Observable<any> {
    return this.httpClient
      .post(this.uploadUrl, formData)
      .pipe(catchError(() => of({ url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' })));
  }

  private deleteImage(url): Observable<any> {
    return this.httpClient.request<null>('delete', this.deleteUrl, { body: { url } }).pipe(catchError(() => of(true)));
  }
}

export const ImageControlRendererTester: RankedTester = rankWith(4, and(uiTypeIs('Control'), optionIs('format', 'image')));
