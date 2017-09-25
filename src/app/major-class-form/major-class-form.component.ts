import 'rxjs/add/operator/switchMap';
import { Component, OnInit, ViewChild }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'

@Component({
  selector: 'app-major-class-form',
  templateUrl: './major-class-form.component.html',
  styleUrls: ['./major-class-form.component.css']
})
export class MajorClassFormComponent implements OnInit {

  successMessage: string;
  errorMessage: string;
  majors;
  classes;
  majorClass: object;

  getRecordForEdit(){
    this.route.params
      .switchMap((params: Params) => this.dataService.getRecord("majorClass", +params['id']))
      .subscribe(majorClass => this.majorClass = majorClass);
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
      this.getMajors();
      this.getClasses();
  }
  // get items for major dropdown
  getMajors() {
    this.dataService.getRecords("major")
      .subscribe(
        majors => this.majors = majors,
        error =>  this.errorMessage = <any>error);
  }

  getClasses() {
    this.dataService.getRecords("class")
      .subscribe(
        classes => this.classes = classes,
        error =>  this.errorMessage = <any>error);
  }

  saveMajorClass(majorClass: NgForm){
    if(typeof majorClass.value.major_class_id === "number"){
      this.dataService.editRecord("majorClass", majorClass.value, majorClass.value.major_class_id)
          .subscribe(
            majorClass => this.successMessage = "Record updated succesfully",
            error =>  this.errorMessage = <any>error);
    }else{
      this.dataService.addRecord("majorClass", majorClass.value)
          .subscribe(
            majorClass => this.successMessage = "Record added succesfully",
            error =>  this.errorMessage = <any>error);
            this.majorClass = {};
    }

  }


  // Code Added for validation!!!!!
  sampleForm: NgForm;
  @ViewChild('majorClassForm') currentForm: NgForm;

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
    'class_id':'',
    'major_id':''
  };

  validationMessages = {
    'class_id': {
      'required':      'Class ID can not be blank, please select an ID from the existing options.'
    },
    'major_id': {
      'required':      'Major ID can not be blank, please select an ID from the existing options.'
    }

  };
}

