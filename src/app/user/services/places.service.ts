import { Injectable } from '@angular/core';
import {Place, PlacesType} from '../../models/places';
import {ApiProviderService} from '../../services/api-provider.service';
import {Observable} from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  constructor(private api: ApiProviderService) { }
  places: Place[] = [];

  getInterestPoints(): Observable<Place[]> {
    return this.api.get('places').pipe(tap((types: any) => {
      this.places = types && types instanceof Array ? types : [];
    }));
  }
}
