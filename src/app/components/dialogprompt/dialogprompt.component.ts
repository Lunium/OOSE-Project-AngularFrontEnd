import { Component, Inject } from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-dialogprompt',
  templateUrl: './dialogprompt.component.html',
  styleUrls: ['./dialogprompt.component.css']
})
export class DialogpromptComponent {



  constructor(
    public dialogRef: MatDialogRef<DialogpromptComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    console.log(data);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

}
