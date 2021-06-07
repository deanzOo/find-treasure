import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { delayWhen } from 'rxjs/operators';
import { timer } from 'rxjs';
import { Place } from '../../models/places';
import {PlacesService} from '../services/places.service';

@Injectable()
export class UserPlacesResolver implements Resolve<Place[]> {

  constructor(private placesService: PlacesService) {}

  resolve() {
    const startTime = Date.now();
    return this.placesService.getInterestPoints().pipe(delayWhen(() => timer(300 + startTime - Date.now())));
  }
}
