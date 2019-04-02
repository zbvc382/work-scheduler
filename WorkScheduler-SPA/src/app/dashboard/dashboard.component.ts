/// <reference types="@types/googlemaps" />
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from '@angular/core';
import { SlotService } from '../_services/slot.service';
import { Day } from '../_models/Day';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Place } from '../_models/Place';
import { SearchMarker } from '../_models/SearchMarker';
import { Tag } from '../_models/Tag';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  zoom = 10;
  latitude = 51.5245;
  longitude = -0.11209;
  searchControl = new FormControl();
  days: Day[];
  today: Date;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  searchLat: number;
  searchLong: number;
  todayJobs: Day;
  tomorrowJobs: Day;
  result: any;
  searchClear = false;
  searching = false;
  locations: Place[] = [];
  selected = new FormControl();
  searchMarker: SearchMarker;
  isCompletedBorder = '#4CAF50';
  notCompletedBorder = '#673AB7';
  markerColourUrls = {
    green: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
    blue: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    yellow: 'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png',
    red: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
  };

  constructor(
    private slotService: SlotService,
    private breakpointObserver: BreakpointObserver,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private httpClient: HttpClient
  ) {}

  ngOnInit() {
    this.today = new Date();
    this.getDaysFromService();

    if (this.isMobile()) {
      this.zoom = 8;
    }

    this.selected.valueChanges.subscribe(value => {
      this.getLocations(value);
    });

    this.searchControl.valueChanges.subscribe(value => {
      if (value.length > 0) {
        this.searchClear = true;
      } else {
        this.searchClear = false;
      }
    });

    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ['geocode']
        }
      );

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.searchMarker = {
            latitude: place.geometry.location.lat(),
            longitude: place.geometry.location.lng()
          };
        });
      });
    });
  }

  getDaysFromService() {
    this.slotService.getWeekSlots(new Date()).subscribe((days: Day[]) => {
      this.days = days;
      this.selected.setValue(days[0]);
      this.todayJobs = days[0];
      this.tomorrowJobs = days[1];
    });
  }

  get getTomorrowJobNumber(): string {
    if (this.tomorrowJobs !== undefined) {
      const jobs = this.tomorrowJobs.slots.filter(x => x.job !== null);

      if (jobs !== null) {
        if (jobs.length === 1) {
          return '1 Job';
        }
        if (jobs.length > 1) {
          return jobs.length + ' Jobs';
        }
      }

      return '0 Jobs';
    }
  }

  get getTodayJobNumber(): string {
    if (this.todayJobs !== undefined) {
      const jobs = this.todayJobs.slots.filter(x => x.job !== null);

      if (jobs !== null) {
        if (jobs.length === 1) {
          return '1 Job';
        }
        if (jobs.length > 1) {
          return jobs.length + ' Jobs';
        }
      }

      return '0 Jobs';
    }
  }

  getLocations(day: Day) {
    this.locations = [];

    day.slots.forEach(element => {
      if (element.job != null) {
        this.callGeo(element.job.postCode).subscribe(data => {
          this.result = data.body;
          if (this.result.status === 'OK') {
            const location = this.result.results[0].geometry.location;
            let markerColourUrl = null;

            if (element.job.tags.length > 0) {
              if (this.isCompleted(element.job.tags)) {
                markerColourUrl = this.markerColourUrls.green;
              } else {
                markerColourUrl = this.markerColourUrls.red;
              }
            } else {
              markerColourUrl = this.markerColourUrls.red;
            }

            this.locations.push({
              postcode: element.job.postCode,
              timeFrom: element.job.timeFrom,
              timeTo: element.job.timeTo,
              latitude: this.result.results[0].geometry.location.lat,
              longitude: this.result.results[0].geometry.location.lng,
              colour: markerColourUrl
            });
          }
        });
      }
    });
  }

  callGeo(postcode: string) {
    const apiURL =
      'https://maps.googleapis.com/maps/api/geocode/json?address=$' +
      postcode +
      '&key=AIzaSyAgDUII_kvGfCJNmu4qhhzjl8YNzblV9Ng';
    return this.httpClient.get(apiURL, { observe: 'response' }).pipe(
      map(response => {
        return response;
      })
    );
  }

  onSearchClear() {
    this.searchControl.setValue('');
    this.searchMarker = null;
  }

  isMobile(): boolean {
    return this.breakpointObserver.isMatched('(max-width: 600px)');
  }

  isCompleted(tags: Tag[]): boolean {
    if (tags.length > 0) {
      return tags.filter(x => x.name === 'Completed') !== null ? true : false;
    }
  }

  isToday(date: Date): boolean {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds()
    );

    if (
      newDate.getDate() === this.today.getDate() &&
      newDate.getDay() === this.today.getDay()
    ) {
      return true;
    }

    return false;
  }
}
