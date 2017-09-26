import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { slideInOutAnimation } from '../animations/slide-in.animation';

@Component({
  selector: 'app-student-class-form',
  templateUrl: './student-class-form.component.html',
  styleUrls: ['./student-class-form.component.css'],
  animations: [slideInOutAnimation]
})
export class StudentClassFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;
  classes;
  students;
  studentClass: object;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("studentClass", +params['id']))
      .subscribe(studentClass => this.studentClass = studentClass);
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
      this.getClasses();
      this.getStudents();
  }

  getClasses() {
    this.dataService.getRecords("class")
      .subscribe(
        classes => this.classes = classes,
        error =>  this.errorMessage = <any>error);
  }

  getStudents() {
    this.dataService.getRecords("student")
      .subscribe(
        students => this.students = students,
        error =>  this.errorMessage = <any>error);
  }

  saveStudentClass(studentClass: NgForm){
    if(typeof studentClass.value.student_class_id === "number"){
      this.dataService.editRecord("studentClass", studentClass.value, studentClass.value.student_class_id)
          .subscribe(
            studentClass => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("studentClass", studentClass.value)
          .subscribe(
            studentClass => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.studentClass = {};
    }

  }


  // Code Added for validation!!!!!
  sampleForm: NgForm;
  @ViewChild('studentClassForm') currentForm: NgForm;

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
    'class_id': '',
    'student_id': ''
  };

  validationMessages = {
    'class_id': {
      'required':      'Major ID can not be blank, please select an ID from the existing options.'
    },
    'student_id': {
      'required':      'Major ID can not be blank, please select an ID from the existing options.'
    }
  
  };
}
