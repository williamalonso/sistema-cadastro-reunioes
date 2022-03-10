import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MeetingService } from 'src/app/service/meeting.service';
import { DeleteComponent } from '../delete/delete.component';
import { MeetingFormComponent } from '../meeting-form/meeting-form.component';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit {

  displayedColumns: string[] = ['meetingName', 'meetingSubject', 'meetingResponsible', 'meetingDate', 'meetingTime', 'action'];
  meetings = [];
  length: number;
  
  totalRecordsPerPage: number = 5;
  meetingNameFind: string; // Pesquisar pelo nome
  meetingDateFind: string;

  constructor(

    private service: MeetingService,
    public dialog: MatDialog
    
  ) { }

  ngOnInit(): void {
    this.findAll(0, 'meetingDate', null);
  }

  findAll(pageNumber: number, sortField: string, filters: any) {
    this.service.getAll(pageNumber, this.totalRecordsPerPage, sortField, filters).subscribe( meetingsReturn => {
      const mapped = Object.values(meetingsReturn); // Converte o objeto 'meetingsReturn' para um array
      //console.log(mapped);
      this.meetings = mapped[0];
      this.length = mapped[1].size;
    }, err => {
      //console.log('erro: ', err);
    }
  )}

  getServerData(event: PageEvent) {
    //console.log("entrou");
    this.findAll(event.pageIndex, 'meetingDate', null);
  }

  edit(idEdit: string) {
    const dialogRef = this.dialog.open(MeetingFormComponent, {
      width: '500px',
      data: idEdit
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    })
  }

  confirmDelete(idDelete: string) {
    const dialogRef = this.dialog.open(DeleteComponent, {
      width: '500px',
      data: idDelete
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    })
  }

}
