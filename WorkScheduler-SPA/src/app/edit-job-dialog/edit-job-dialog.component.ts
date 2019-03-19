import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Tag } from '../_models/Tag';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-edit-job-dialog',
  templateUrl: './edit-job-dialog.component.html',
  styleUrls: ['./edit-job-dialog.component.css']
})
export class EditJobDialogComponent implements OnInit {
  jobReport: string;
  defaultTags: Tag[];
  jobTags: Tag[];
  jobId: number;

  constructor(private dialogRef: MatDialogRef<EditJobDialogComponent>, @Inject(MAT_DIALOG_DATA) data) {
    this.defaultTags = data.defaultTags;
    this.jobTags = data.jobTags;
    this.jobReport = data.jobReport;
    this.jobId = data.jobId;
  }

  ngOnInit() {
    this.setTags();
  }

  setTags() {
    if (this.jobTags.length > 0) {
      this.jobTags.forEach(element => {
        this.defaultTags[element.id - 1] = element;
      });
    }
  }

  onSelect(tag: Tag) {
    if (tag.selected === false) {
      this.defaultTags[tag.id - 1].selected = true;
    } else {
      this.defaultTags[tag.id - 1].selected = false;
    }
  }
  close() {
    this.dialogRef.close();
  }

  save() {
    const selectedTags = this.defaultTags.filter(x => x.selected === true).map((value: Tag) => {
      return value.id;
    });
    const unselectedTags = this.defaultTags.filter(x => x.selected === false).map((value: Tag) => {
      return value.id;
    });
    const object = {id: this.jobId, selectedTags, unselectedTags};
    const selectedArray: Tag[] = this.defaultTags.filter(x => x.selected === true);

    const data = [object, selectedArray];
    this.dialogRef.close(data);
  }
}
