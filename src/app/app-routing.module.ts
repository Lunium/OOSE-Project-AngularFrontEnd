import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {ReservationsComponent} from './components/reservations/reservations.component';
import {RoomreservationComponent} from './components/roomreservation/roomreservation.component';
import {MyreservationsComponent} from "./components/myreservations/myreservations.component";


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'myreservations', component: MyreservationsComponent},
  {path: 'reservations', component: ReservationsComponent},
  {path: 'reservations/room/:wingCode/:roomCode', component: RoomreservationComponent}
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
