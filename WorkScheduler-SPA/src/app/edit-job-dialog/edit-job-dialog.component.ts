import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Tag } from '../_models/Tag';

@Component({
  selector: 'app-edit-job-dialog',
  templateUrl: './edit-job-dialog.component.html',
  styleUrls: ['./edit-job-dialog.component.css']
})
export class EditJobDialogComponent implements OnInit {
  report: string;
  tags: Tag[];

  constructor(private dialogRef: MatDialogRef<EditJobDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.report = data.report;
    this.tags = data.tags;
  }

  ngOnInit() {
  }

}
