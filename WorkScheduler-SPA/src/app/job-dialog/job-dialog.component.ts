import {
  Component,
  OnInit,
  Inject,
  ElementRef,
  ViewChild,
  Renderer2,
  ChangeDetectorRef
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { AgencyService } from '../_services/agency.service';
import { Agency } from '../_models/Agency';
import { TimeService } from '../_services/time.service';
import { JobService } from '../_services/job.service';
import { ExtraJob } from '../_models/ExtraJob';
import { ApplianceService } from '../_services/appliance.service';
import { ApplianceType } from '../_models/ApplianceType';

@Component({
  selector: 'app-job-dialog',
  templateUrl: './job-dialog.component.html',
  styleUrls: ['./job-dialog.component.css']
})
export class JobDialogComponent implements OnInit {
  @ViewChild('jobNumberInput') jobInput: ElementRef;
  form: FormGroup;
  jobId: number;
  payerTypes: string[];
  timeFrom = 'Time From';
  timeTo = 'Time To';
  agencies: Agency[] = [];
  applianceTypes: ApplianceType[] = [];
  isLandlord = false;
  isAgency = false;
  isPrivate = false;
  fromDefault = '';
  toDefault = '';
  replaced = false;
  isExtraVisit = false;
  jobNumber: string;

  filteredAgencies: Observable<Agency[]>;
  filteredApplianceTypes: Observable<ApplianceType[]>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<JobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data,
    private agencyService: AgencyService,
    private timeService: TimeService,
    private jobService: JobService,
    private renderer: Renderer2,
    private snackBar: MatSnackBar,
    private applianceService: ApplianceService,
    private cdr: ChangeDetectorRef
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
      postCode: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(8)]
      ],
      tenantName: ['', [Validators.maxLength(30)]],
      tenantPhone: ['', [Validators.maxLength(15)]],
      keyAddress: [{ value: '', disabled: true }],
      key: false,
      agencyReference: ['', [Validators.maxLength(20)]],
      agencyContactName: ['', [Validators.maxLength(30)]],
      agencyPhone: ['', [Validators.maxLength(15)]]
    });

    this.getAgenciesFromService();
    this.getApplianceTypesFromService();
  }

  onPayerTypeSelection() {
    const payerType = this.form.get('payerType');

    if (payerType.value === 'Agency') {
      this.isAgency = true;
      this.isLandlord = false;
      this.isPrivate = false;
    }

    if (payerType.value === 'Landlord') {
      this.isAgency = false;
      this.isLandlord = true;
      this.isPrivate = false;
    }

    if (payerType.value === 'Private') {
      this.isAgency = false;
      this.isLandlord = false;
      this.isPrivate = true;
    }

    payerType.disable();
  }

  getAgenciesFromService() {
    this.agencyService.getAgencies().subscribe((agencies: Agency[]) => {
      this.agencies = agencies;
      this.filteredAgenciesOptions();
    });
  }

  getApplianceTypesFromService() {
    this.applianceService.getApplianceTypes().subscribe((applianceTypes: ApplianceType[]) => {
      this.applianceTypes = applianceTypes;
      this.filteredApplianceTypesOptions();
    });
  }

  onExtraVisitToggle() {
    this.isExtraVisit = !this.isExtraVisit;
  }

  onKeyToggle() {
    const control = this.form.get('keyAddress');
    control.disabled ? control.enable() : control.disable();
  }

  private filteredApplianceTypesOptions() {
    // tslint:disable-next-line:no-string-literal
    this.filteredApplianceTypes = this.form.controls['applianceType'].valueChanges.pipe(
      startWith(''),
      map(val => (val.length >= 1 ? this.filterApplianceTypes(val) : []))
    );
  }

  private filteredAgenciesOptions() {
    // tslint:disable-next-line:no-string-literal
    this.filteredAgencies = this.form.controls['agency'].valueChanges.pipe(
      startWith(''),
      map(val => (val.length >= 1 ? this.filterAgency(val) : []))
    );
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.form.get('agency').value != null) {
        if (this.form.get('agency').value.length < 1) {
          this.form.get('agency').setValue(null);
        }
      }
      if (this.form.get('applianceType').value != null) {
        if (this.form.get('applianceType').value.length < 1) {
          this.form.get('applianceType').setValue(null);
        }
      }
      if (this.form.get('problemGiven').value != null) {
        if (this.form.get('problemGiven').value.length < 1) {
          this.form.get('problemGiven').setValue(null);
        }
      }
      if (this.form.get('landlordName').value != null) {
        if (this.form.get('landlordName').value.length < 1) {
          this.form.get('landlordName').setValue(null);
        }
      }
      if (this.form.get('landlordPhone').value != null) {
        if (this.form.get('landlordPhone').value.length < 1) {
          this.form.get('landlordPhone').setValue(null);
        }
      }
      if (this.form.get('privatePhone').value != null) {
        if (this.form.get('privatePhone').value.length < 1) {
          this.form.get('privatePhone').setValue(null);
        }
      }
      if (this.form.get('privateName').value != null) {
        if (this.form.get('privateName').value.length < 1) {
          this.form.get('privateName').setValue(null);
        }
      }
      if (this.form.get('tenantName').value != null) {
        if (this.form.get('tenantName').value.length < 1) {
          this.form.get('tenantName').setValue(null);
        }
      }
      if (this.form.get('tenantPhone').value != null) {
        if (this.form.get('tenantPhone').value.length < 1) {
          this.form.get('tenantPhone').setValue(null);
        }
      }
      if (this.form.get('agencyContactName').value != null) {
        if (this.form.get('agencyContactName').value.length < 1) {
          this.form.get('agencyContactName').setValue(null);
        }
      }
      if (this.form.get('agencyPhone').value != null) {
        if (this.form.get('agencyPhone').value.length < 1) {
          this.form.get('agencyPhone').setValue(null);
        }
      }
      if (this.form.get('agencyReference').value != null) {
        if (this.form.get('agencyReference').value.length < 1) {
          this.form.get('agencyReference').setValue(null);
        }
      }
      if (this.form.get('keyAddress').value != null) {
        if (this.form.get('keyAddress').value.length < 1) {
          this.form.get('keyAddress').setValue(null);
        }
      }

      if (this.isExtraVisit && this.jobId != null) {
        this.dialogRef.close([this.form.getRawValue(), this.jobId]);
      } else {
        this.dialogRef.close([this.form.getRawValue(), null]);
      }
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

  private filterAgency(name: string): Agency[] {
    const filterValue = name.toLowerCase();
    return this.agencies.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  private filterApplianceTypes(name: string): ApplianceType[] {
    const filterValue = name.toLowerCase();
    return this.applianceTypes.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  displayFn(user?: Agency): string | undefined {
    return user ? user.name : undefined;
  }

  displayApplianceFn(user?: ApplianceType): string | undefined {
    return user ? user.name : undefined;
  }

  openSnackbar(message: string, className: string) {
    this.snackBar.open(message, '', {
      duration: 4000,
      panelClass: [className],
    });
  }

  onJobEnter() {
    if (this.jobNumber.trim().length > 0) {
      this.jobService
        .getJobByJobNumber(this.jobNumber)
        .subscribe((job: ExtraJob) => {
          if (job != null) {
            this.jobId = job.id;
            delete job.id;
            this.form.setValue(job);
            this.form.get('timeFrom').setValue(this.fromDefault);
            this.form.get('timeTo').setValue(this.toDefault);
            this.form.get('problemGiven').setValue('');
            this.onPayerTypeSelection();
            this.form.get('payerType').disable();
            this.renderer.setStyle(
              this.jobInput.nativeElement,
              'color',
              'green'
            );
            this.openSnackbar('Job found', 'success-snackbar');
          } else {
            this.jobId = null;
            this.renderer.setStyle(this.jobInput.nativeElement, 'color', 'red');
            this.openSnackbar('Job not found', 'failure-snackbar');
          }
        });
    }
  }
}
