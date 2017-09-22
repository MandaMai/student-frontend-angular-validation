import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { AppRoutingModule } from './routing/routing.module';
import { StudentComponent } from './student/student.component';
import { HomeComponent } from './home/home.component';
import { DataService } from './data.service';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';
import { StudentFormComponent } from './student-form/student-form.component';
import { StatusMessageComponent } from './status-message/status-message.component';
import { GradeComponent } from './grade/grade.component';
import { AssignmentComponent } from './assignment/assignment.component';
import { ClassComponent } from './class/class.component';
import { MajorComponent } from './major/major.component';
import { InstructorComponent } from './instructor/instructor.component';
import { MajorClassComponent } from './major-class/major-class.component';
import { StudentClassComponent } from './student-class/student-class.component';
import { GradeFormComponent } from './grade-form/grade-form.component';
import { AssignmentFormComponent } from './assignment-form/assignment-form.component';
import { ClassFormComponent } from './class-form/class-form.component';
import { MajorFormComponent } from './major-form/major-form.component';
import { InstructorFormComponent } from './instructor-form/instructor-form.component';
import { MajorClassFormComponent } from './major-class-form/major-class-form.component';
import { StudentClassFormComponent } from './student-class-form/student-class-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    StudentComponent,
    HomeComponent,
    DeleteConfirmComponent,
    StudentFormComponent,
    StatusMessageComponent,
    GradeComponent,
    AssignmentComponent,
    ClassComponent,
    MajorComponent,
    InstructorComponent,
    MajorClassComponent,
    StudentClassComponent,
    GradeFormComponent,
    AssignmentFormComponent,
    ClassFormComponent,
    MajorFormComponent,
    InstructorFormComponent,
    MajorClassFormComponent,
    StudentClassFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  entryComponents: [DeleteConfirmComponent],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
