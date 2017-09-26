import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'
import { fadeInAnimation } from '../animations/fade-in.animation';
import { slideInOutAnimation } from '../animations/slide-in.animation';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css'],
  animations: [slideInOutAnimation]
})
export class StudentFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;
  majors;//need this variable for each dropdown item that is collected

  student: object;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("student", +params['id']))
      .subscribe(student => this.student = student);
  }

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params
      .subscribe((params: Params) => {
        (+params['id']) ? this.getRecordForEdit() : null;
      });
      this.getMajors()//run method to get items for dropdown
  }

  // get items for major dropdown
  getMajors() {
    this.dataService.getRecords("major")
      .subscribe(
        majors => this.majors = majors,
        error =>  this.errorMessage = <any>error);
  }

  saveStudent(student: NgForm){
    if(typeof student.value.student_id === "number"){
      this.dataService.editRecord("student", student.value, student.value.student_id)
          .subscribe(
            student => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("student", student.value)
          .subscribe(
            student => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.student = {};
    }

  }


  // Code Added for validation!!!!!
  sampleForm: NgForm;
  @ViewChild('studentForm') currentForm: NgForm;

  onSubmit(data: NgForm) {
    console.log(data.value);
    // console.log(this.model);
  }

  ngAfterViewChecked() {
    this.formChanged();
  }

  formChanged() {
    //if the form didn't change then do nothing
    if (this.currentForm === this.sampleForm) { return; }
    //set the form to the current form for comparison
    this.sampleForm = this.currentForm;
    //subscribe to form changes and send the changes to the onValueChanged method
    this.sampleForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
  }

  onValueChanged(data?: any) {
    let form = this.sampleForm.form;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

  //start out the errors as an emtpy string
  formErrors = {
    'first_name': '',
    'last_name': '',
    'start_date': '',
    'gpa':'',
    'sat':'',
    'major_id':''
  };

  validationMessages = {
    'first_name': {
      'required':      'First name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name can not be longer than 30 characters long.'
    },
    'last_name': {
      'required':      'First name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name can not be longer than 30 characters long.'
    },
    'start_date': {
      'required':      'Start date is required.',
      'pattern':       'Must use this format: YYYY-MM-DD for date value'
    },
    'gpa': {
      'pattern':       'GPA should be a number between 0.0-4.0 with one decimal place'
    }, 
    'sat': {
      'maxlength':     'Number can not be more than four digits long',
      'pattern':       'SAT score should be a number between 0-1600'
    }, 
    'major_id': {
      'required':      'Major ID can not be blank, please select an ID from the existing options.'
    }

  };

}
