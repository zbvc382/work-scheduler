import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AgencyService } from '../_services/agency.service';
import { Agency } from '../_models/Agency';

@Component({
  selector: 'app-job-dialog',
  templateUrl: './job-dialog.component.html',
  styleUrls: ['./job-dialog.component.css']
})
export class JobDialogComponent implements OnInit {
  form: FormGroup;
  payerTypes: string[];
  timeFrom = 'Time From';
  timeTo = 'Time To';
  agencies: Agency[] = [];
  isLandlord = false;
  isAgency = false;
  isPrivate = false;

  filteredOptions: Observable<Agency[]>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<JobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private agencyService: AgencyService
  ) {
    this.payerTypes = data.payerTypes;
  }

  ngOnInit() {
    this.form = this.fb.group({
      PayerType: ['', []],
      Appliance: ['', []],
      Problem: ['', []],
      TimeFrom: ['', []],
      TimeTo: ['', []],
      Agency: ['', []],
      LandlordName: ['', []],
      LandlordPhone: ['', []],
      PrivateName: ['', []],
      PrivatePhone: ['', []],
      Address: ['', []],
      Postcode: ['', []],
      TenantName: ['', []],
      TenantPhone: ['', []],
      KeyAddress: [{ value: '', disabled: true }],
      KeyPickup: false,
      AgencyReference: ['', []]
    });

    this.getAgenciesFromService();
  }

  onPayerTypeSelection() {
    // tslint:disable-next-line:no-string-literal
    const selection = this.form.controls['PayerType'].value;

    if (selection === 'Agency') {
      this.isAgency = true;
      this.isLandlord = false;
      this.isPrivate = false;
    }

    if (selection === 'Landlord') {
      this.isAgency = false;
      this.isLandlord = true;
      this.isPrivate = false;
    }

    if (selection === 'Private') {
      this.isAgency = false;
      this.isLandlord = false;
      this.isPrivate = true;
    }
  }

  getAgenciesFromService() {
    this.agencyService.getAgencies().subscribe((agencies: Agency[]) => {
      this.agencies = agencies;
      this.filterOptions();
    });
  }

  onKeyToggle() {
    const control = this.form.get('KeyAddress');
    control.disabled ? control.enable() : control.disable();
  }

  private filterOptions() {
    // tslint:disable-next-line:no-string-literal
    this.filteredOptions = this.form.controls['Agency'].valueChanges.pipe(
      startWith(''),
      map(val => (val.length >= 1 ? this.filter(val) : []))
    );
  }

  onSubmit() {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  timeFromEvent(value) {
    // tslint:disable-next-line:no-string-literal
    this.form.controls['TimeFrom'].setValue(value);
  }

  timeToEvent(value) {
    // tslint:disable-next-line:no-string-literal
    this.form.controls['TimeTo'].setValue(value);
  }

  close() {
    this.dialogRef.close();
  }

  private filter(name: string): Agency[] {
    const filterValue = name.toLowerCase();
    return this.agencies.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  displayFn(user?: Agency): string | undefined {
    return user ? user.name : undefined;
  }
}
