import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { slideInOutAnimation } from '../animations/slide-in.animation';

@Component({
  selector: 'app-class-form',
  templateUrl: './class-form.component.html',
  styleUrls: ['./class-form.component.css'],
  animations: [slideInOutAnimation]
})
export class ClassFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;
  instructors;
  course: object;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("class", +params['id']))
      .subscribe(course => this.course = course);
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
      this.getInstructors();
  }
  // get items for major dropdown
  getInstructors() {
    this.dataService.getRecords("instructor")
      .subscribe(
        instructors => this.instructors = instructors,
        error =>  this.errorMessage = <any>error);
  }

  saveClass(course: NgForm){
    if(typeof course.value.class_id === "number"){
      this.dataService.editRecord("class", course.value, course.value.class_id)
          .subscribe(
            course => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("class", course.value)
          .subscribe(
            course => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.course = {};
    }

  }


  // Code Added for validation!!!!!
  sampleForm: NgForm;
  @ViewChild('classForm') currentForm: NgForm;

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
    'instructor_id': '',
    'subject': '',
    'course':''
  };

  validationMessages = {
    'instructor_id': {
      'required':      'Instructor ID can not be blank, please select an ID from the existing options.'
    },
    'subject': {
      'required':      'Subject is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name can not be longer than 30 characters long.'
    },
    
    'course': {
      'maxlength':     'Number can not be more than three digits long',
      'minlength':     'Number can not be less than three digits long',
      'required':      'Course number is required, please enter the appropriate course number to submit form.'
    }

  };
}
