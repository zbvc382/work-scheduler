import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-delete-job-dialog',
  templateUrl: './delete-job-dialog.component.html',
  styleUrls: ['./delete-job-dialog.component.css']
})
export class DeleteJobDialogComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<DeleteJobDialogComponent>) { }

  ngOnInit() {
  }

  cancel() {
    this.dialogRef.close(false);
  }

  confirm() {
    this.dialogRef.close(true);
  }

}
