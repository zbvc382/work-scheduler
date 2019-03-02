import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { ReactiveFormsModule } from '@angular/forms';
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
      JobsComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      BrowserAnimationsModule,
      MaterialModule,
      FlexLayoutModule,
      ReactiveFormsModule,
      RouterModule,
      MomentModule,
      RouterModule.forRoot(appRoutes),
      NgMatSearchBarModule,
      LayoutModule,
      JwtModule.forRoot({
         config: {
            tokenGetter,
            whitelistedDomains: ['localhost:5000'],
            blacklistedRoutes: ['localhost:5000/auth']
         }
      })
   ],
   providers: [
      AuthService,
      JobService,
      AuthGuard,
      DateFormat,
      SlotService,
      MomentDateModule
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
