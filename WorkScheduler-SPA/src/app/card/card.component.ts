import { BehaviorSubject } from 'rxjs';
import { Day } from '../_models/Day';
import { FormControl } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { JobDialogComponent } from '../job-dialog/job-dialog.component';
import { Job } from '../_models/Job';
import { JobService } from '../_services/job.service';
import { TimeService } from '../_services/time.service';
import { isObject } from 'util';
import { DeleteJobDialogComponent } from '../delete-job-dialog/delete-job-dialog.component';
import { SlotService } from '../_services/slot.service';
import { JobToCreate } from '../_models/JobToCreate';
import { EditJobDialogComponent } from '../edit-job-dialog/edit-job-dialog.component';
import { TagService } from '../_services/tag.service';
import { Tag } from '../_models/Tag';

import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  ViewChild
} from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';
import {
  MatDialog,
  MatDialogConfig,
  MatSnackBar,
  MatDatepickerInputEvent,
  MatPaginator
} from '@angular/material';
import { Photo } from '../_models/Photo';
import { PhotoService } from '../_services/photo.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('detailExpand', [
      state(
        'collapsed',
        style({ height: '0px', minHeight: '0', display: 'none' })
      ),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class CardComponent implements OnInit, OnDestroy {
  @Output() addJobEmitter = new EventEmitter();
  @Output() calendarEmitter = new EventEmitter<{ date: Date }>();
  @Output() dateChange: EventEmitter<MatDatepickerInputEvent<any>>;
  @Input() hidePageSize: boolean;
  date = new FormControl(new Date());
  expanded: boolean[] = [false];
  days: Day[];
  defaultTags: Tag[];
  searchValue = '';
  selectable = false;
  blur = false;
  searchResultLength = 0;
  dateRangeSelected = '';
  queriedJobs: Job[];
  totalItems = 0;
  pageIndex = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  searching = false;
  searchClear = false;
  private data$ = new BehaviorSubject<Day[]>([]);
  payerTypes = ['Agency', 'Private', 'Landlord'];

  @Input() set data(value: Day[]) {
    this.data$.next(value);
  }

  get data() {
    return this.data$.getValue();
  }

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private jobService: JobService,
    private timeService: TimeService,
    private snackBar: MatSnackBar,
    private slotService: SlotService,
    private tagService: TagService,
    private photoService: PhotoService
  ) {}

  ngOnInit() {
    this.data$.subscribe(j => {
      this.days = this.data;
    });
    this.loadTags();

    // this.jobService.getJobByJobNumber('JB5037').subscribe(response => {
    //   console.log(response);
    // }, error => {
    //   console.log(error);
    // });
  }

  ngOnDestroy(): void {}

  onDateRangeSelection() {
    this.queryJobs();

    if (this.paginator !== undefined) {
      this.paginator.firstPage();
    }
  }

  onPaginateChange(event) {
    const pageNumber = event.pageIndex + 1;
    this.queryJobs(pageNumber.toString());
  }

  isTags(tags: Tag[]): boolean {
    if (tags.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  onSearchInput() {
    if (this.searchValue.length > 0) {
      this.searchClear = true;
    } else {
      this.searchClear = false;
      this.searching = false;
    }
  }

  onSearchFocus() {
    this.blur = true;
  }

  onSearchFocusOut() {
    this.blur = false;
  }

  onCalendarSelect() {
    this.calendarEmitter.emit({ date: this.date.value });
  }

  onSearchEnter() {
    if (this.searchValue.trim().length > 0) {
      this.queryJobs();
      this.searching = true;

      if (this.paginator !== undefined) {
        this.paginator.firstPage();
      }
    }
  }

  queryJobs(pageNumber?: string) {
    let range;

    if (this.dateRangeSelected !== '') {
      range = this.dateRangeSelected;
    }

    this.slotService
      .getSearchSlots(this.searchValue.trim(), pageNumber, range)
      .subscribe(data => {
        if (data !== null) {
          this.queriedJobs = data.result;
          this.totalItems = data.pagination.totalItems;
        }
      });
  }

  onSearchClear() {
    this.searchValue = '';
    this.searchClear = false;
    this.searching = false;
    this.dateRangeSelected = '';
    this.queriedJobs = null;
  }

  onExpansion() {
    if (this.expanded[0] === false) {
      this.expanded[0] = true;
    } else {
      this.expanded[0] = false;
    }
  }

  get isMobile(): boolean {
    return this.breakpointObserver.isMatched('(max-width: 600px)');
  }

  openSnackbar(message: string, className: string) {
    this.snackBar.open(message, '', {
      duration: 4000,
      panelClass: [className]
    });
  }

  addJob(data, date: Date, index: number) {
    let job: JobToCreate;

    if (!isObject(data.agency)) {
      if (data.agency != null) {
        const tempName = data.agency;
        const tempId = 0;
        delete data.agency;
        job = data;
        job.agency = { id: tempId, name: tempName };
      }
    }

    job = data;
    job.dateAssigned = date;

    if (index != null) {
      job.slotIndex = index;
      job.slotReplaced = true;
    } else {
      job.slotIndex = null;
      job.slotReplaced = false;
    }

    if (job.key === false) {
      job.keyAddress = null;
    }

    job.timeFrom = this.timeService.get24HourTime(job.timeFrom, new Date(date));
    job.timeTo = this.timeService.get24HourTime(job.timeTo, new Date(date));

    this.jobService.createJob(job).subscribe(
      () => {
        this.addJobEmitter.emit(null);
        this.openSnackbar('Job created', 'success-snackbar');
      },
      error => {
        console.log(error);
      }
    );
  }

  openDialog(
    date: Date,
    index: number,
    defaultFrom: Date = null,
    defaultTo: Date = null
  ) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.height = '680px';
    dialogConfig.width = '800px';

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    dialogConfig.data = {
      payerTypes: this.payerTypes,
      fromDefault: '',
      toDefault: '',
      replaced: false
    };

    if (defaultFrom != null && defaultTo != null) {
      dialogConfig.data = {
        fromDefault: defaultFrom,
        toDefault: defaultTo,
        payerTypes: this.payerTypes,
        replaced: true
      };
    }

    let dialogRef = this.dialog.open(JobDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.addJob(data, date, index);
      }
    });
    dialogRef = null;
  }

  loadTags() {
    this.tagService.getTags().subscribe(
      (tags: Tag[]) => {
        this.defaultTags = tags;
      },
      error => {
        console.log(error);
      }
    );
  }

  onEditJobDialog(report: string, tags: Tag[], id: number, dayId: number, jobPhotos: Photo[]) {
    const dialogConfig = new MatDialogConfig();
    const modifiedDefaultTags = this.defaultTags;
    let jobIndex: number;
    const tagsArray: Tag[] = [];

    if (tags.length > 0) {
      for (const iterator of tags) {
        tagsArray.push({
          id: iterator.id,
          name: iterator.name,
          color: iterator.color,
          selected: true
        });
      }
    }

    for (let i = 0; i < this.days[dayId].slots.length; i++) {
      if (this.days[dayId].slots[i].job != null) {
        if (this.days[dayId].slots[i].job.id === id) {
          jobIndex = i;
        }
      }
    }

    modifiedDefaultTags.forEach(element => {
      element.selected = false;
    });

    dialogConfig.autoFocus = false;
    dialogConfig.disableClose = true;

    if (this.isMobile === true) {
      dialogConfig.height = '620px';
      dialogConfig.width = '600px';
    } else {
      dialogConfig.height = '500px';
      dialogConfig.width = '650px';
    }


    dialogConfig.data = {
      defaultTags: modifiedDefaultTags,
      jobReport: report,
      jobTags: tagsArray,
      jobId: id,
      photos: jobPhotos
    };

    const dialogRef = this.dialog.open(EditJobDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => {
        if (data) {
          this.jobService.updateJob(data[0]).subscribe(() => {
            this.days[dayId].slots[jobIndex].job.tags = data[1];
            this.days[dayId].slots[jobIndex].job.report = data[0].report;
          }, error => {
            console.log('Failed to update job');
          });

          if (data[2] === true) {
            this.photoService.getPhotos(id).subscribe((photos: Photo[]) => {
              this.days[dayId].slots[jobIndex].job.photos = photos;
              this.data$.next(this.days);
            });
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  onDeleteJobDialog(jobId: number, dayId: number) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.autoFocus = false;

    const dialogRef = this.dialog.open(DeleteJobDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.jobService.deleteJob(jobId).subscribe(
          () => {
            let index: number;

            for (let i = 0; i < this.days[dayId].slots.length; i++) {
              if (this.days[dayId].slots[i].job != null) {
                if (this.days[dayId].slots[i].job.id === jobId) {
                  index = i;
                }
              }
            }
            this.days[dayId].slots.splice(index, 1);
            this.openSnackbar('Job deleted', 'success-snackbar');
          },
          error => {
            console.log('Could not delete job');
          }
        );
      }
    });
  }
}
