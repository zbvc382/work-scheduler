import { Injectable } from '@angular/core';
import { Slot } from '../_models/Slot';
import { JobService } from './job.service';
import { DateFormat } from '../_pipes/date-format.pipe';
import { Job } from '../_models/Job';
import { Day } from '../_models/Day';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SlotService {
  private jobs: Job[] = [];
  private days: Day[] = [];
  private queriedJobs$ = new BehaviorSubject<Job[]>([]);
  private days$ = new BehaviorSubject<Day[]>([]);

  constructor(
    private jobService: JobService,
    private dateFormatPipe: DateFormat,
  ) {}

  getWeekSlots(date: Date): Observable<Day[]> {
    date.setHours(0, 0, 0, 0);
    const dateFormated = this.dateFormatPipe.transform(date);

    this.jobService.getJobs(dateFormated).subscribe(
      (jobs: Job[]) => {
        jobs.forEach(job => {
          job.timeFrom = new Date(job.timeFrom);
          job.timeTo = new Date(job.timeTo);
          job.dateAssigned = new Date(job.dateAssigned);
        });
        this.jobs = jobs;
        this.setSlots(date);
        this.days$.next(this.days);
        this.Clear();
      },
      error => {
        console.log('Failed to fetch jobs.');
      }
    );
    return this.days$.asObservable();
  }

  getSearchSlots(query: string) {
    this.jobService.searchJobs(query).subscribe(
      (jobs: Job[]) => {
        jobs.forEach(job => {
          job.timeFrom = new Date(job.timeFrom);
          job.timeTo = new Date(job.timeTo);
          job.dateAssigned = new Date(job.dateAssigned);
        });
        this.queriedJobs$.next(jobs);
      },
      error => {
        console.log('Failed to fetch jobs');
      }
    );
    return this.queriedJobs$.asObservable();
  }

  private Clear() {
    this.days = [];
    this.jobs = [];
  }

  private setSlots(date: Date) {
    for (let i = 0; i < 8; i++) {
      const tempDate = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds());

      tempDate.setHours(0, 0, 0, 0);

      let jobs: Job[] = [];
      tempDate.setDate(tempDate.getDate() + i);
      const tempSlots = this.getDefaultSlots();

      jobs = this.jobs.filter(
        x => x.dateAssigned.getTime() === tempDate.getTime()
      );

      jobs.forEach(element => {
        if (element.slotReplaced === true) {
          tempSlots[element.slotIndex].job = element;
          tempSlots[element.slotIndex].defaultFrom = element.timeFrom;
        }
        if (element.slotReplaced === false) {
          const jobToInsert = element;
          tempSlots.push({
            index: null,
            job: jobToInsert,
            defaultFrom: element.timeFrom,
            defaultTo: null
          });
        }
      });

      const remainingEmptySlots = tempSlots.filter(x => x.job === null);

      remainingEmptySlots.forEach(element => {
        element.defaultFrom.setFullYear(
          tempDate.getFullYear(),
          tempDate.getMonth(),
          tempDate.getDate()
        );
        tempSlots[element.index] = element;
      });

      tempSlots.sort((a: Slot, b: Slot) => {
        return a.defaultFrom.getTime() - b.defaultFrom.getTime();
      });

      this.days.push({id: i, date: tempDate, slots: tempSlots });
    }
  }

  private getDefaultSlots(): Slot[] {
    const slots: Slot[] = [
      {
        index: 0,
        job: null,
        defaultFrom: new Date('2000-01-01T09:00:00'),
        defaultTo: new Date('2000-01-01T11:00:00')
      },
      {
        index: 1,
        job: null,
        defaultFrom: new Date('2000-01-01T11:00:00'),
        defaultTo: new Date('2000-01-01T13:00:00')
      },
      {
        index: 2,
        job: null,
        defaultFrom: new Date('2000-01-01T13:00:00'),
        defaultTo: new Date('2000-01-01T15:00:00')
      },
      {
        index: 3,
        job: null,
        defaultFrom: new Date('2000-01-01T15:00:00'),
        defaultTo: new Date('2000-01-01T17:00:00')
      }
    ];
    return slots;
  }
}
