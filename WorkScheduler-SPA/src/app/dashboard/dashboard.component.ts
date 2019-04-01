/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { SlotService } from '../_services/slot.service';
import { Day } from '../_models/Day';
import { BreakpointObserver } from '@angular/cdk/layout';
import { FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Place } from '../_models/Place';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],

})
export class DashboardComponent implements OnInit {
  latitude = 51.52450;
  longitude = -0.11209;
  zoom = 10;
  searchControl = new FormControl();
  days: Day[];
  today: Date;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  searchLat: number;
  searchLong: number;
  address = 'E163NP';
  result: any;
  locations: Place[] = [];

  constructor(private slotService: SlotService,
              private breakpointObserver: BreakpointObserver,
              private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private httpClient: HttpClient) { }

  ngOnInit() {
    this.today = new Date();
    this.slotService.getWeekSlots(new Date()).subscribe((days: Day[]) => {
      this.days = days;
    });

    this.CallGeoAPI().subscribe(data => {
      this.result = data.body;
      const location = this.result.results[0].geometry.location;
      console.log(location);
      this.locations.push({latitude: this.result.results[0].geometry.location.lat,
        longitude: this.result.results[0].geometry.location.lng });
    });

    console.log(this.locations);

    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['geocode']
      });
      
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 10;
        });
      });
    });
  }

  CallGeoAPI(){
    let apiURL = 'https://maps.googleapis.com/maps/api/geocode/json?address=$E163NP&key=AIzaSyAgDUII_kvGfCJNmu4qhhzjl8YNzblV9Ng';
    return this.httpClient.get(apiURL, {observe: 'response'}).pipe(
      map((response) => {
        return response;
      }));
  }

  isMobile(): boolean {
    return this.breakpointObserver.isMatched('(max-width: 600px)');
  }

  isToday(date: Date): boolean {
    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      date.getHours(),
      date.getMinutes(),
      date.getSeconds());

    if ((newDate.getDate() === this.today.getDate()) && (newDate.getDay() === this.today.getDay())) {
      return true;
    }

    return false;
  }
}
