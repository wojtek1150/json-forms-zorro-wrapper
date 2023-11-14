import { Inject, Injectable, InjectionToken } from '@angular/core';
import { BehaviorSubject, Observable, Observer, of } from 'rxjs';

export let JZW_GOOGLE_PLACES_API_KEY: InjectionToken<{ apiKey: string }> = new InjectionToken<{ apiKey: string }>('google-places.config');

@Injectable()
export class GooglePlacesApiLoaderService {
  mapsLoaded = new BehaviorSubject<boolean>(false);
  private readonly gapiUrl: string = 'https://maps.googleapis.com/maps/api/js';
  private readonly apiKey: string;

  constructor(@Inject(JZW_GOOGLE_PLACES_API_KEY) apiKey: string) {
    this.apiKey = apiKey;
    this.loadGoogleMapsApi().subscribe();
  }

  private loadGoogleMapsApi(): Observable<boolean> {
    if (this.mapsLoaded.value === true) {
      return of(true);
    }
    return new Observable((observer: Observer<boolean>) => {
      const node = document.createElement('script');
      node.src = `${this.gapiUrl}?key=${this.apiKey}&libraries=places&language=en&callback=console.log`;
      node.type = 'text/javascript';
      document.getElementsByTagName('head')[0].appendChild(node);
      node.onload = () => {
        this.mapsLoaded.next(true);
        observer.next(true);
        observer.complete();
      };
    });
  }
}
