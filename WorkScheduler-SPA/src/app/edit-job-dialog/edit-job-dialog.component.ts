import { Component, OnInit, Inject, OnChanges } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Tag } from '../_models/Tag';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Photo } from '../_models/Photo';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-edit-job-dialog',
  templateUrl: './edit-job-dialog.component.html',
  styleUrls: ['./edit-job-dialog.component.css']
})
export class EditJobDialogComponent implements OnInit, OnChanges {
  form: FormGroup;
  public uploader: FileUploader;
  jobReport: string;
  defaultTags: Tag[];
  jobTags: Tag[];
  jobId: number;
  uploaded = false;
  baseUrl = environment.apiUrl;

  constructor(private dialogRef: MatDialogRef<EditJobDialogComponent>,
              @Inject(MAT_DIALOG_DATA) data,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private breakpointObserver: BreakpointObserver) {

    this.defaultTags = data.defaultTags;
    this.jobTags = data.jobTags;
    this.jobReport = data.jobReport;
    this.jobId = data.jobId;
  }

  onChanges(): void {
    this.form.get('multiplefile').valueChanges.subscribe(val => {
      if (val != null) {
        this.uploader.addToQueue(val._files);
      }
      if (!this.uploader.isUploading && val === null) {
        this.uploader.clearQueue();
      }
    });
  }

  ngOnChanges() {

  }

  ngOnInit() {
    this.form = this.fb.group({
      multiplefile: [{ value: undefined, disabled: false }],
      jobreport: [this.jobReport, [Validators.maxLength(200)]]
    });
    this.setTags();
    this.initialiseUploader();
    this.onChanges();
    this.uploader.onWhenAddingFileFailed = () => { this.openSnackbar('Failed to add photo', 'failure-snackbar'); };
    this.uploader.onCompleteAll = () => { this.openSnackbar('Upload successful', 'success-snackbar'); };
  }

  onUpload() {
    this.uploader.uploadAll();
    this.form.get('multiplefile').reset();
    this.uploaded = true;
  }

  initialiseUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'jobs/' + this.jobId + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      allowedFileType: ['image'],
      removeAfterUpload: true,
      isHTML5: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
  }

  setTags() {
    if (this.jobTags.length > 0) {
      this.jobTags.forEach(element => {
        this.defaultTags[element.id - 1] = element;
      });
    }
  }

  isMobile(): boolean {
    return this.breakpointObserver.isMatched('(max-width: 600px)');
  }

  openSnackbar(message: string, className: string) {
    this.snackBar.open(message, '', {
      duration: 4000,
      panelClass: [className]
    });
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
    const object = { id: this.jobId, selectedTags, unselectedTags, report: this.form.get('jobreport').value };
    const selectedArray: Tag[] = this.defaultTags.filter(x => x.selected === true);

    const data = [object, selectedArray, this.uploaded];

    this.dialogRef.close(data);
  }
}
