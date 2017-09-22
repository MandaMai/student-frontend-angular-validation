import 'rxjs/add/operator/switchMap';
import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';
import { NgForm } from '@angular/forms';

import { DataService } from '../data.service'

@Component({
  selector: 'app-student-class-form',
  templateUrl: './student-class-form.component.html',
  styleUrls: ['./student-class-form.component.css']
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

}
