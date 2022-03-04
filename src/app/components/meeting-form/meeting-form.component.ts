import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-meeting-form',
  templateUrl: './meeting-form.component.html',
  styleUrls: ['./meeting-form.component.css']
})
export class MeetingFormComponent implements OnInit {

  public meetingForm!: FormGroup;

  constructor(
    
    private fb: FormBuilder,

    public dialogRef: MatDialogRef<MeetingFormComponent>,
    //@Optional @Inject(MAT_DIALOG_DATA) public data: string
    
    ) { }

  // aqui é onde vamos criar nosso Form
  ngOnInit(): void {
    this.meetingForm = this.fb.group({
      id : [null],
      meetingName : ['', Validators.required],
      meetingSubject : ['', Validators.required],
      meetingResponsible : ['', Validators.required],
      meetingDate : ['', Validators.required],
      meetingTime : ['', Validators.required],
    })
  }

  cancelScreen(): void {
    this.dialogRef.close();
  }

}
