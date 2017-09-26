import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service';
import { fadeInAnimation } from '../animations/fade-in.animation';
import { slideInOutAnimation } from '../animations/slide-in.animation';

@Component({
  selector: 'app-grade-form',
  templateUrl: './grade-form.component.html',
  styleUrls: ['./grade-form.component.css'],
  animations: [slideInOutAnimation]
})
export class GradeFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;

  grade: object;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("grade", +params['id']))
      .subscribe(student => this.grade = student);
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

  }

  saveGrade(grade: NgForm){
    if(typeof grade.value.grade_id === "number"){
      this.dataService.editRecord("grade", grade.value, grade.value.grade_id)
          .subscribe(
            grade => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("grade", grade.value)
          .subscribe(
            grade => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.grade = {};
    }

  }


  // Code Added for validation!!!!!
  sampleForm: NgForm;
  @ViewChild('gradeForm') currentForm: NgForm;

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
    'grade': ''
  };

  validationMessages = {
    'grade': {
      'required':      'Grade is required.',
      'minlength':     'Name must be at least 1 character long.',
      'maxlength':     'Name can not be longer than 30 characters long.'
    }

  };
}

