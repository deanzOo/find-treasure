import { Component, OnInit } from '@angular/core';
import { ConditionTypeTitles, Place, PlacesType, PlaceTypeTitles } from '../../../models/places';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-places',
  templateUrl: './user-places.component.html',
  styleUrls: ['./user-places.component.scss']
})
export class UserPlacesComponent implements OnInit {
  places: Place[] = [];
  conditionTypeTitles = ConditionTypeTitles;
  placeType = PlacesType;
  placeTypeTitles = PlaceTypeTitles;
  currentType = PlacesType.Dog_garden;

  constructor(private rout: ActivatedRoute) { }

  ngOnInit(): void {
    this.places = this.rout.snapshot.data.places.filter(park => park.type === this.currentType);
  }

  applyFilter() {
    this.places = this.rout.snapshot.data.places.filter(park => park.type === this.currentType);
  }

}
