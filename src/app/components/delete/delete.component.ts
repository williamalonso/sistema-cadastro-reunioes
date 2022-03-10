import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MeetingService } from 'src/app/service/meeting.service';

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {

  public idDelete: string;

  constructor(
    
    private service: MeetingService,

    public dialogRef: MatDialogRef<DeleteComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: string, // esse 'data' vem da 'meeting-list.ts'
    private router: Router

  ) { 
    this.idDelete = data;
   }

  ngOnInit(): void {
  }

  cancel(): void {
    this.dialogRef.close();
  }

  delete() {
    this.service.delete(this.idDelete).subscribe(result => {
      console.log('Resp Delete', result);
    }, err => {
      console.log('Error ', err);
    });
    this.dialogRef.close(true);
    window.setTimeout(function(){location.reload()}, 1000) // recarrega a página após 1s
  }

}
