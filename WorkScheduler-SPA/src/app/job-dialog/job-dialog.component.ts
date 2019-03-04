import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
      Time: ['', []]
    });
  }
  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
