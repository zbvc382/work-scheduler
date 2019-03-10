import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AgencyService } from '../_services/agency.service';
import { Agency } from '../_models/Agency';
import { TimeService } from '../_services/time.service';

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
  fromDefault = '';
  toDefault = '';
  replaced = false;

  filteredOptions: Observable<Agency[]>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<JobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private agencyService: AgencyService,
    private timeService: TimeService
  ) {
    this.payerTypes = data.payerTypes;
    this.fromDefault = data.fromDefault;
    this.toDefault = data.toDefault;
    this.replaced = data.replaced;
  }

  ngOnInit() {
    this.form = this.fb.group({
      payerType: ['', [Validators.required]],
      applianceType: ['', []],
      problemGiven: ['', []],
      agency: ['', []],
      timeFrom: ['', [Validators.required]],
      timeTo: ['', [Validators.required]],
      landlordName: ['', []],
      landlordPhone: ['', []],
      privateName: ['', []],
      privatePhone: ['', []],
      address: ['', [Validators.required]],
      postcode: ['', [Validators.required]],
      tenantName: ['', []],
      tenantPhone: ['', []],
      keyAddress: [{ value: '', disabled: true }],
      key: false,
      agencyReference: ['', []]
    });

    this.getAgenciesFromService();
  }

  onPayerTypeSelection() {
    // tslint:disable-next-line:no-string-literal
    const selection = this.form.controls['payerType'].value;

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
    const control = this.form.get('keyAddress');
    control.disabled ? control.enable() : control.disable();
  }

  private filterOptions() {
    // tslint:disable-next-line:no-string-literal
    this.filteredOptions = this.form.controls['agency'].valueChanges.pipe(
      startWith(''),
      map(val => (val.length >= 1 ? this.filter(val) : []))
    );
  }

  onSubmit() {
    if (this.form.valid) {
      // tslint:disable-next-line:no-string-literal
      if (!this.form.controls['agency'].dirty) {
        // tslint:disable-next-line:no-string-literal
        this.form.controls['agency'].setValue(null);
      }
      // tslint:disable-next-line:no-string-literal
      if (!this.form.controls['applianceType'].dirty) {
        // tslint:disable-next-line:no-string-literal
        this.form.controls['applianceType'].setValue(null);
      }
      // tslint:disable-next-line:no-string-literal
      if (!this.form.controls['problemGiven'].dirty) {
        // tslint:disable-next-line:no-string-literal
        this.form.controls['problemGiven'].setValue(null);
      }
      // tslint:disable-next-line:no-string-literal
      if (!this.form.controls['landlordName'].dirty) {
        // tslint:disable-next-line:no-string-literal
        this.form.controls['landlordName'].setValue(null);
      }
      // tslint:disable-next-line:no-string-literal
      if (!this.form.controls['landlordPhone'].dirty) {
        // tslint:disable-next-line:no-string-literal
        this.form.controls['landlordPhone'].setValue(null);
      }
      // tslint:disable-next-line:no-string-literal
      if (!this.form.controls['privatePhone'].dirty) {
        // tslint:disable-next-line:no-string-literal
        this.form.controls['privatePhone'].setValue(null);
      }
      // tslint:disable-next-line:no-string-literal
      if (!this.form.controls['privateName'].dirty) {
        // tslint:disable-next-line:no-string-literal
        this.form.controls['privateName'].setValue(null);
      }
      // tslint:disable-next-line:no-string-literal
      if (!this.form.controls['tenantName'].dirty) {
        // tslint:disable-next-line:no-string-literal
        this.form.controls['tenantName'].setValue(null);
      }
      // tslint:disable-next-line:no-string-literal
      if (!this.form.controls['tenantPhone'].dirty) {
        // tslint:disable-next-line:no-string-literal
        this.form.controls['tenantPhone'].setValue(null);
      }
      // tslint:disable-next-line:no-string-literal
      if (!this.form.controls['agencyReference'].dirty) {
        // tslint:disable-next-line:no-string-literal
        this.form.controls['agencyReference'].setValue(null);
      }
      this.dialogRef.close(this.form.value);
    }
  }

  timeFromEvent(value) {
    if (value instanceof Date) {
      value = this.timeService.get12HourTime(value);
    }
    // tslint:disable-next-line:no-string-literal
    this.form.controls['timeFrom'].setValue(value);
  }

  timeToEvent(value) {
    if (value instanceof Date) {
      value = this.timeService.get12HourTime(value);
    }
    // tslint:disable-next-line:no-string-literal
    this.form.controls['timeTo'].setValue(value);
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
