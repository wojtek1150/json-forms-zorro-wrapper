// google.maps.places.PlaceResult

export interface CityLocation {
  placeId: string;
  formattedCityName: string;
}

export interface Place {
  adr_address?: string;
  formatted_address?: string;
  place_id?: string;
}

export class GooglePlaceFormatterHelper {
  static getFormattedPlace(place: Place): CityLocation {
    const parser = new DOMParser();
    const htmlDoc = parser.parseFromString(place.adr_address, 'text/html');
    let formattedCityName = '';
    if (place.adr_address?.includes('locality')) {
      const localityStr = htmlDoc.querySelector<HTMLElement>('.locality').textContent;
      const region = htmlDoc.querySelector<HTMLElement>('.region');
      const regionStr = region ? ', ' + region.textContent : '';
      formattedCityName = localityStr + regionStr;
    } else if (place.formatted_address.includes(',')) {
      formattedCityName = place.formatted_address.split(',')[0];
    } else {
      formattedCityName = place.formatted_address;
    }
    return {
      placeId: place.place_id,
      formattedCityName,
    };
  }
}
