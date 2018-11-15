import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ReservationsComponent } from './components/reservations/reservations.component';
import { RestJsonService } from './services/restcallback/restjsonarrayservice.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatFormFieldModule
} from '@angular/material';

// import { FlexLayoutModule } from '@angular/flex-layout';
import { FilterComponent } from './components/filter/filter.component';
import { RoomreservationComponent } from './components/roomreservation/roomreservation.component';
import { LoginComponent } from './components/login/login.component';
import { AppRoutingModule } from './/app-routing.module';
import {DataService} from "./services/dataservice/dataservice.service";
import { MyreservationsComponent } from './components/myreservations/myreservations.component';
import { DialogpromptComponent } from './components/dialogprompt/dialogprompt.component';
import {TimeslottableService} from "./services/timeslottableservice/timeslottable.service";

@NgModule({
  declarations: [
    AppComponent,
    ReservationsComponent,
    RoomreservationComponent,
    FilterComponent,
    LoginComponent,
    MyreservationsComponent,
    DialogpromptComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatGridListModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSelectModule,
    MatCheckboxModule,
    MatMenuModule,
    AppRoutingModule,
    MatTableModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTooltipModule
  ],
  providers: [
    DataService,
    RestJsonService,
    TimeslottableService,
    DatePipe
  ],
  entryComponents: [
    DialogpromptComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
