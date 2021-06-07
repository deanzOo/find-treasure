export interface Place {
  id?: number;
  type?: PlacesType;
  name: string;
  street: string;
  neighborhood: string;
  operator: string;
  handicapped: boolean;
  condition: ConditionType;
  deleted?: boolean;
  active: PlaceActiveType;
  icon?: string;
  image?: string;
  created_at?: string;
  update_at?: string;
}

export enum PlaceActiveType {
  InActive,
  Active
}


export enum PlacesType {
  Dog_garden = 0,
  Historic_Parks = 1,
  Cafewithdog = 2,
  NationalParks = 3,
}

export enum ConditionType {
  Working_Active = 0,
  Working_Not_Active = 1,
  Not_Working_Active = 2,
  Not_Working_Not_Active = 3,
}

export let PlaceTypeTitles = { };
PlaceTypeTitles[PlacesType.Dog_garden] = 'פארקים';
PlaceTypeTitles[PlacesType.Historic_Parks] = 'אתרים היסטורים';
PlaceTypeTitles[PlacesType.Cafewithdog] = 'בית קפה';
PlaceTypeTitles[PlacesType.NationalParks] = 'מסעדה';

export let ConditionTypeTitles = { };
ConditionTypeTitles[ConditionType.Working_Active] = 'פעיל ותקין';
ConditionTypeTitles[ConditionType.Working_Not_Active] = 'תקין ולא פעיל';
ConditionTypeTitles[ConditionType.Not_Working_Active] = 'לא תקין ופעיל';
ConditionTypeTitles[ConditionType.Not_Working_Not_Active] = 'לא תקין ולא פעיל';
