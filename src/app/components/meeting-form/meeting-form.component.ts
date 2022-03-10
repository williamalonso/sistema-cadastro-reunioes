import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MeetingService } from 'src/app/service/meeting.service';

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.css']
})
export class MeetingFormComponent implements OnInit {

  public meetingForm: FormGroup;
  public isEdit: string;

  constructor(

    private service: MeetingService,
    private fb: FormBuilder,

    public dialogRef: MatDialogRef<MeetingFormComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: string // esse 'data' vem da 'meeting-list.ts'
    
    ) { 
      this.isEdit = data;
     }

  // aqui é onde vamos criar nosso Form
  ngOnInit(): void {
    this.meetingForm = this.fb.group({
      id : [null],
      meetingName : ['', Validators.required],
      meetingSubject : ['', Validators.required],
      meetingResponsible : ['', Validators.required],
      meetingDate : ['', Validators.required],
      meetingTime : ['', Validators.required],
    });

    if(this.isEdit != null) {
      this.getById();
    }

  }

  getById() {
    this.service.getById(this.isEdit).subscribe(result => {
      
      const mapped = Object.values(result);
      //id = mapped[4]
      //console.log(mapped);

      this.meetingForm = this.fb.group({
        id : [ mapped[4], Validators.required],
        meetingName : [ mapped[1], Validators.required],
        meetingSubject : [ mapped[5], Validators.required],
        meetingResponsible : [ mapped[2], Validators.required],
        meetingDate : [ mapped[3], Validators.required],
        meetingTime : [ mapped[0], Validators.required],
      });

    },
    err => {
      console.log('Err', err);
    });
    
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save() {
    if(this.meetingForm.value.id == null) {
      this.create();
    } else {
      this.update();
    }
  }

  create() {
    this.service.insert(this.meetingForm.value).subscribe( result => {
      //console.log('Meeting Insert', result);
    },
    err => {
      //console.log('Err', err);
    });
    this.dialogRef.close(true);
    this.meetingForm.reset();
    window.setTimeout(function(){location.reload()}, 1000) // recarrega a página após 1s
  }

  update() {
    this.service.update(this.meetingForm.value).subscribe( result => {
      console.log('Meeting Insert', result);
    },
    err => {
      console.log('Err', err);
    });
    this.dialogRef.close(true);
    this.meetingForm.reset();
    window.setTimeout(function(){location.reload()}, 1000) // recarrega a página após 1s
  }

}
