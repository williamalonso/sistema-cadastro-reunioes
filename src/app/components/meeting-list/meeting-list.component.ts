import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MeetingService } from 'src/app/service/meeting.service';

@Component({
  selector: 'app-meeting-list',
  templateUrl: './meeting-list.component.html',
  styleUrls: ['./meeting-list.component.css']
})
export class MeetingListComponent implements OnInit {

  displayedColumns: string[] = ['meetingName', 'meetingSubject', 'meetingResponsible'];
  meetings = [];
  length: number;
  pageSize: number = 5; //Número de registros por página
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
      console.log(mapped);
      this.meetings = mapped[0];
      this.length = mapped.length;
    }, err => {
      console.log('erro: ', err);
    }
  )}

}
