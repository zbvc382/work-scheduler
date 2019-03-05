import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

export interface Zyze {
  id: number;
  name: string;
}

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
  options: Zyze[] = [
    { id: 1, name: 'Mary' },
    { id: 2, name: 'Shelley' },
    { id: 3, name: 'Igor' }
  ];
  filteredOptions: Observable<Zyze[]>;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<JobDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data) {

    this.payerTypes = data.payerTypes;
  }

  ngOnInit() {
    this.form = this.fb.group({
      PayerType: ['', []],
      ApplianceType: ['', []],
      ProblemGiven: ['', []],
      TimeFrom: ['', []],
      TimeTo: ['', []],
      PropertyAddress: ['', []],
      Time: ['', []],
      Agency: ['', []]
    });
    // tslint:disable-next-line:no-string-literal
    this.filteredOptions = this.form.controls['Agency'].valueChanges
      .pipe(
        startWith<string | Zyze>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filter(name) : this.options.slice())
      );
  }
  save() {
    this.dialogRef.close(this.form.value);
    console.log(this.form.value);
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

  private filter(name: string): Zyze[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  displayFn(user?: Zyze): string | undefined {
    return user ? user.name : undefined;
  }
}
