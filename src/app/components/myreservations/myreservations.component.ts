import { Component, OnInit } from '@angular/core';
import { RestJsonService } from "../../services/restcallback/restjsonarrayservice.service";
import { UserReservation } from "../../models/userreservation/userreservation.interface.model";
import {MatDialog, MatSnackBar, MatTableDataSource} from "@angular/material";
import {DialogpromptComponent} from "../dialogprompt/dialogprompt.component";

@Component({
  selector: 'app-myreservations',
  templateUrl: './myreservations.component.html',
  styleUrls: ['./myreservations.component.css']
})
export class MyreservationsComponent implements OnInit {

  dataSource = null;
  hasData = false;
  user;
  error;

  constructor(private service: RestJsonService, private snackBar: MatSnackBar, public dialog: MatDialog) {  }

  openSnackBar(message: string, action: string, duration: number): void {
    this.snackBar.open(message, action, {
      duration: 5000
    });
  }

  openDialog(reservation: UserReservation): void {
      const dialogRef = this.dialog.open(DialogpromptComponent, {
        width: 'auto',
        data: { reservation: reservation }
      });

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.cancelReservation(reservation);
      }
    });
  }

  cancelReservation(reservation: UserReservation): void {
    this.service.patchUserReservation("http://localhost:8080/reservation/cancel", reservation.roomCode, reservation.wingCode, reservation.date, reservation.beginTime)
      .then( finished => {
        this.service.getAllUserReservatons('http://localhost:8080/reservation/user/reservations', sessionStorage.getItem('sessionEmail'))
          .then(data => {

            this.dataSource = new MatTableDataSource(data);
            this.openSnackBar(`De reservering van ${reservation.date} om ${reservation.beginTime} is verwijderd.`, 'sluiten', 7500);

            this.hasData = false;

            if(data.length > 0){
              this.hasData = true;
            }

            console.log(data);
          })
          .catch ( error => {
            this.error = error;
          });
      });
  }

  ngOnInit() {
    this.user = sessionStorage.getItem('sessionEmail').split('@')[0];
    this.service.getAllUserReservatons('http://localhost:8080/reservation/user/reservations', sessionStorage.getItem('sessionEmail'))
      .then(data => {

        this.dataSource = new MatTableDataSource(data);

       if(data.length > 0){
         this.hasData = true;
       }
        console.log(data);
      })
      .catch ( error => {
        this.error = error;
      });
  }

}
