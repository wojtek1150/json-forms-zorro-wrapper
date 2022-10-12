import { ChangeDetectorRef, Component } from '@angular/core';
import { JsonFormsAngularService, JsonFormsControl } from '../../jsonForms';
import { Actions, and, optionIs, RankedTester, rankWith, uiTypeIs } from '@jsonforms/core';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';
import { catchError, finalize, Observable, Observer, of, Subscription, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NzShowUploadList, NzUploadXHRArgs } from 'ng-zorro-antd/upload/interface';
import { hasOption } from '../../other/complex.helper';

@Component({
  selector: 'ImageUploadRenderer',
  templateUrl: './image.renderer.html',
  styleUrls: ['./image.renderer.scss'],
})
export class ImageControlRenderer extends JsonFormsControl {
  public fileList: NzUploadFile[] = [];
  public isLoading = false;
  public previewButtonsConfig: NzShowUploadList;
  public allowedExtensions = ['image/jpeg', 'image/png', 'image/gif'];

  public hint?: string;

  private imageToEdit?: string;

  private uploadUrl: string;
  private deleteUrl?: string;
  private minImageWidth: number;
  private minImageHeight: number;
  private maxImageWidth: number;
  private maxImageHeight: number;
  private maxImageSizeMB: number;

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

  override ngOnInit() {
    super.ngOnInit();
    if (this.form.value) {
      this.imageToEdit = this.form.value;
      this.initImageUrlInEditionMode();
    }
  }

  override getEventValue = (value: any) => {
    if (value !== undefined && value !== this.imageToEdit) {
      return value;
    }
  };

  override mapAdditionalProps(props) {
    super.mapAdditionalProps(props);
    const { options } = props.uischema;
    this.minImageWidth = options.minImageWidth || 300;
    this.minImageHeight = options.minImageHeight || 300;
    this.maxImageWidth = options.maxImageWidth || 9999;
    this.maxImageHeight = options.maxImageHeight || 9999;
    this.maxImageSizeMB = options.maxImageSizeMB || 8;
    this.hint = options.hint;
    this.uploadUrl = options.uploadUrl;
    this.deleteUrl = options.deleteUrl;
    this.allowedExtensions = options.allowedExtensions || ['image/jpeg', 'image/png', 'image/gif'];

    this.previewButtonsConfig = { showRemoveIcon: !!this.deleteUrl };
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
    this.isLoading = true;
    this.imageUrl = 'PENDING';
    const formData = new FormData();
    formData.append('files[]', item.file as unknown as File);

    return this.uploadImages(formData)
      .pipe(
        tap((response: { url: string }) => {
          this.imageUrl = response.url;
          // @ts-ignore
          item.onSuccess();
        }),
        catchError(err => {
          this.error = err.error?.message || 'Sorry, your image cannot be uploaded. Please, try again later.';
          // @ts-ignore
          item.onError();
          this.imageUrl = '';
          return of(err);
        }),
        finalize(() => (this.isLoading = false))
      )
      .subscribe();
  };

  handleChange(info: NzUploadChangeParam): void {
    const fileList = [...info.fileList];
    this.fileList = fileList.slice(-1);
  }

  handleRemoveFile = (): boolean => {
    this.imageUrl = '';
    this.fileList = [];
    return true;
  };

  removeImage(url: string): void {
    if (this.imageToEdit !== url) {
      this.deleteImage(url).subscribe();
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
        this.changeDetectorRef.detectChanges();
        observer.complete();
        return;
      }

      const hasValidSize = file.size <= this.maxImageSizeMB * 1_000 * 1_000;
      if (!hasValidSize) {
        this.error = `Image has to be smaller than ${this.maxImageSizeMB}MB.`;
        this.changeDetectorRef.detectChanges();
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
            this.changeDetectorRef.detectChanges();
            observer.complete();
            return;
          }
          const hasValidMaxDimensions = img.width <= this.maxImageHeight && img.height <= this.maxImageHeight;
          if (!hasValidMaxDimensions) {
            this.error = `Image has to be smaller than ${this.maxImageHeight}x${this.maxImageWidth}.`;
            this.changeDetectorRef.detectChanges();
            observer.complete();
            return;
          }

          this.changeDetectorRef.detectChanges();
          this.error = null;
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
    return this.httpClient.post(this.uploadUrl, formData);
  }

  private deleteImage(url): Observable<any> {
    return this.httpClient.request<null>('delete', this.deleteUrl, { body: { url } });
  }
}

export const ImageControlRendererTester: RankedTester = rankWith(4, and(uiTypeIs('Control'), optionIs('format', 'image'), hasOption('uploadUrl')));
