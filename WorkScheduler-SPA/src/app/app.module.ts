import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthService } from './_services/auth.service';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HeaderComponent } from './header/header.component';
import { SidenavListComponent } from './sidenav-list/sidenav-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { JobService } from './_services/job.service';
import { CardComponent } from './card/card.component';
import { JobsComponent } from './jobs/jobs.component';
import { MomentModule } from 'ngx-moment';
import { DateFormat } from './_pipes/date-format.pipe';
import { SlotService } from './_services/slot.service';
import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { LayoutModule } from '@angular/cdk/layout';
import { JwtModule } from '@auth0/angular-jwt';
import { JobDialogComponent } from './job-dialog/job-dialog.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { TimePickerComponent } from './time-picker/time-picker.component';
import { AgencyService } from './_services/agency.service';
import { TimeService } from './_services/time.service';
import { DeleteJobDialogComponent } from './delete-job-dialog/delete-job-dialog.component';
import { Safe } from './_pipes/safe.pipe';
import { EditJobDialogComponent } from './edit-job-dialog/edit-job-dialog.component';
import { TagService } from './_services/tag.service';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { TabContentComponent } from './tab-content/tab-content.component';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { PhotoService } from './_services/photo.service';
import { ApplianceService } from './_services/appliance.service';
import { SplitPipe } from './_pipes/split.pipe';
import { AgmCoreModule } from '@agm/core';

export function tokenGetter() {
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      LoginComponent,
      DashboardComponent,
      HeaderComponent,
      SidenavListComponent,
      CardComponent,
      JobsComponent,
      JobDialogComponent,
      DeleteJobDialogComponent,
      TimePickerComponent,
      Safe,
      SplitPipe,
      EditJobDialogComponent,
      TabContentComponent
   ],
   imports: [
      BrowserModule,
      FormsModule,
      HttpClientModule,
      BrowserAnimationsModule,
      MaterialModule,
      FlexLayoutModule,
      ReactiveFormsModule,
      FileUploadModule,
      RouterModule,
      MomentModule,
      NgxGalleryModule,
      MaterialFileInputModule,
      RouterModule.forRoot(appRoutes),
      NgMatSearchBarModule,
      LayoutModule,
      MDBBootstrapModule.forRoot(),
      NgxMaterialTimepickerModule.forRoot(),
      JwtModule.forRoot({
         config: {
            tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/auth']
         }
      }),
      AgmCoreModule.forRoot({
         apiKey: 'AIzaSyCzdxX8LunlQMdF94C39gWKfEii40YKSa8',
         libraries: ['places']
       })
   ],
   providers: [
      AuthService,
      JobService,
      AuthGuard,
      DateFormat,
      SlotService,
      MomentDateModule,
      AgencyService,
      TimeService,
      Safe,
      TagService,
      PhotoService,
      ApplianceService
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [JobDialogComponent, DeleteJobDialogComponent, EditJobDialogComponent]
})
export class AppModule { }
