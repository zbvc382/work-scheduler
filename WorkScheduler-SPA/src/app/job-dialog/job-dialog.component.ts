import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AgencyService } from '../_services/agency.service';
import { Agency } from '../_models/Agency';
import { TimeService } from '../_services/time.service';
import { JobService } from '../_services/job.service';
import { ExtraJob } from '../_models/ExtraJob';

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
  isExtraVisit = false;
  jobNumber: string;

  filteredOptions: Observable<Agency[]>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<JobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private agencyService: AgencyService,
    private timeService: TimeService,
    private jobService: JobService
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
      problemGiven: ['', [Validators.max(400)]],
      agency: ['', []],
      timeFrom: ['', [Validators.required]],
      timeTo: ['', [Validators.required]],
      landlordName: ['', [Validators.maxLength(30)]],
      landlordPhone: ['', [Validators.maxLength(15)]],
      privateName: ['', [Validators.maxLength(30)]],
      privatePhone: ['', [Validators.maxLength(15)]],
      address: ['', [Validators.required, Validators.maxLength(60)]],
      postCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
      tenantName: ['', [Validators.maxLength(30)]],
      tenantPhone: ['', [Validators.maxLength(15)]],
      keyAddress: [{ value: '', disabled: true }],
      key: false,
      agencyReference: ['', [Validators.maxLength(20)]],
      agencyContactName: ['', [Validators.maxLength(30)]],
      agencyPhone: ['', [Validators.maxLength(15)]]
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

  onExtraVisitToggle() {
    this.isExtraVisit = !this.isExtraVisit;
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
      if (this.form.controls['agency'].value.length < 1) {
        // tslint:disable-next-line:no-string-literal
        this.form.controls['agency'].setValue(null);
      }
      // tslint:disable-next-line:no-string-literal
      if (this.form.controls['applianceType'].value.length < 1) {
        // tslint:disable-next-line:no-string-literal
        this.form.controls['applianceType'].setValue(null);
      }
      // tslint:disable-next-line:no-string-literal
      if (this.form.controls['problemGiven'].value.length < 1) {
        // tslint:disable-next-line:no-string-literal
        this.form.controls['problemGiven'].setValue(null);
      }
      // tslint:disable-next-line:no-string-literal
      if (this.form.controls['landlordName'].value.length < 1) {
        // tslint:disable-next-line:no-string-literal
        this.form.controls['landlordName'].setValue(null);
      }
      // tslint:disable-next-line:no-string-literal
      if (this.form.controls['landlordPhone'].value.length < 1) {
        // tslint:disable-next-line:no-string-literal
        this.form.controls['landlordPhone'].setValue(null);
      }
      // tslint:disable-next-line:no-string-literal
      if (this.form.controls['privatePhone'].value.length < 1) {
        // tslint:disable-next-line:no-string-literal
        this.form.controls['privatePhone'].setValue(null);
      }
      // tslint:disable-next-line:no-string-literal
      if (this.form.controls['privateName'].value.length < 1) {
        // tslint:disable-next-line:no-string-literal
        this.form.controls['privateName'].setValue(null);
      }
      // tslint:disable-next-line:no-string-literal
      if (this.form.controls['tenantName'].value.length < 1) {
        // tslint:disable-next-line:no-string-literal
        this.form.controls['tenantName'].setValue(null);
      }
      // tslint:disable-next-line:no-string-literal
      if (this.form.controls['tenantPhone'].value.length < 1) {
        // tslint:disable-next-line:no-string-literal
        this.form.controls['tenantPhone'].setValue(null);
      }
      // tslint:disable-next-line:no-string-literal
      if (this.form.controls['agencyContactName'].value.length < 1) {
        // tslint:disable-next-line:no-string-literal
        this.form.controls['agencyContactName'].setValue(null);
      }
      // tslint:disable-next-line:no-string-literal
      if (this.form.controls['agencyPhone'].value.length < 1) {
        // tslint:disable-next-line:no-string-literal
        this.form.controls['agencyPhone'].setValue(null);
      }
      // tslint:disable-next-line:no-string-literal
      if (this.form.controls['agencyReference'].value.length < 1) {
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
    this.dialogRef.close(null);
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

  onJobEnter() {
    if (this.jobNumber.trim().length > 0) {
      this.jobService.getJobByJobNumber(this.jobNumber).subscribe((job: ExtraJob) => {
        if (job != null) {
          console.log(job);
          console.log('Job found!');

          this.form.setValue(job);

          this.form.get('timeFrom').setValue(this.fromDefault);
          this.form.get('timeTo').setValue(this.toDefault);
          this.form.get('problemGiven').setValue('');

          this.onPayerTypeSelection();
          this.form.get('payerType').disable();
        } else {
          console.log(job);
          console.log('Job not found');
        }
      });
    }
  }
}
