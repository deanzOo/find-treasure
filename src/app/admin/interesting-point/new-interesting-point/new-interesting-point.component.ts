import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConditionType, ConditionTypeTitles, Place, PlaceActiveType, PlacesType, PlaceTypeTitles } from '../../../models/places';
import { InterestingPointService } from '../../services/interesting-point.service';
import { PlacesImageModalComponent } from '../../places-image-modal/places-image-modal.component';

@Component({
  selector: 'app-new-interesting-point',
  templateUrl: './new-interesting-point.component.html',
  styleUrls: ['./new-interesting-point.component.scss']
})
export class NewInterestingPointComponent implements OnInit {
  conditionType = ConditionType;
  placesType = PlacesType;
  placeTypeTitles = PlaceTypeTitles;
  conditionTypeTitles = ConditionTypeTitles;

  constructor(
    private interestingPointService: InterestingPointService,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public dialogData: Place
  ) {
  }
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    street: new FormControl('', []),
    neighborhood: new FormControl('', [Validators.required, Validators.minLength(3)]),
    operator: new FormControl('', [Validators.required, Validators.maxLength(10)]),
    handicapped: new FormControl('', []),
    condition: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required])
  });
  mode: any;
  get name() {
    return this.form.get('name');
  }

  get street() {
    return this.form.get('street');
  }

  get neighborhood() {
    return this.form.get('neighborhood');
  }

  get operator() {
    return this.form.get('operator');
  }

  get handicapped() {
    return this.form.get('handicapped');
  }

  get condition() {
    return this.form.get('condition');
  }

  get type() {
    return this.form.get('type');
  }
  ngOnInit(): void {
    if (this.dialogData) {
      this.form.setValue({
        name: this.dialogData.name,
        street: this.dialogData.street,
        neighborhood: this.dialogData.neighborhood,
        operator: this.dialogData.operator,
        handicapped: this.dialogData.handicapped,
        condition: this.dialogData.condition,
        type: this.dialogData.type
      });
      console.log(this.dialogData);
    }
  }
  addInterestingPoint() {
    if (this.form.invalid) {
      this.toastr.error('חובה למלא את כל השדות המסומנים');
      return;
    }
    this.interestingPointService.saveInterestingPoint({
        name: this.name.value,
        street: this.street.value,
        neighborhood: this.neighborhood.value,
        operator: this.operator.value,
        handicapped: !!this.handicapped.value,
        condition: this.condition.value,
        type: this.type.value,
        active: PlaceActiveType.Active
    }).subscribe((res) => {
      this.toastr.success('הפעולה הסתיימה בהצלחה!');
      this.dialogRef.close(res);
    }, err => {
      this.toastr.error('הפעולה נכשלה!');
      console.log('err', err);
    });
  }


  updateInterestingPoint() {
    if (this.form.invalid || !this.dialogData || !this.dialogData.id) {
      this.toastr.error('חובה למלא את כל השדות המסומנים');
      return;
    }
    this.interestingPointService.updateInterestingPoint({
      id: this.dialogData.id,
      name: this.name.value,
      street: this.street.value,
      neighborhood: this.neighborhood.value,
      operator: this.operator.value,
      handicapped: !!this.handicapped.value,
      condition: this.condition.value,
      type: this.type.value,
      active: this.dialogData.active
    }).subscribe((res) => {
      this.toastr.success('הפעולה הסתיימה בהצלחה');
      this.dialogRef.close(res);
    }, err => {
      this.toastr.error('הפעולה נכשלה');
      console.log('err', err);
    });
  }


  preview() {
    this.dialog.open(PlacesImageModalComponent, {
      width: '600px',
      direction: 'rtl',
      data: this.dialogData
    }).afterClosed().subscribe(result => {
      if (result && result.id) {
        if (this.dialogData.icon !== '' || this.dialogData.image !== '') {
          this.dialogData.icon = result.icon;
          this.dialogData.image = result.image;
          this.interestingPointService
            .updateInterestingPoint(this.dialogData)
            .subscribe(
              (res) => {
                this.toastr.success('תמונות עודכנו בהצלחה');
                this.dialogRef.close(res);
              },
              (err) => {
                this.toastr.error('הפעולה נכשלה');
                console.log('err', err);
              }
            );
        }
      }
    });
  }

}
