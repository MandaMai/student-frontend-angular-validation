import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { StudentComponent }   from '../student/student.component';
import { StudentFormComponent }   from '../student-form/student-form.component';
import { HomeComponent }   from '../home/home.component';

import { MajorComponent }   from '../major/major.component';
import { MajorFormComponent }   from '../major-form/major-form.component';

import { ClassComponent }   from '../class/class.component';
import { ClassFormComponent }   from '../class-form/class-form.component';

import { GradeComponent }   from '../grade/grade.component';
import { GradeFormComponent }   from '../grade-form/grade-form.component';

import { InstructorComponent }   from '../instructor/instructor.component';
import { InstructorFormComponent }   from '../instructor-form/instructor-form.component';

import { AssignmentComponent }   from '../assignment/assignment.component';
import { AssignmentFormComponent }   from '../assignment-form/assignment-form.component';

import { StudentClassComponent }   from '../student-class/student-class.component';
import { StudentClassFormComponent }   from '../student-class-form/student-class-form.component';

import { MajorClassComponent }   from '../major-class/major-class.component';
import { MajorClassFormComponent }   from '../major-class-form/major-class-form.component';
 
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home',  component: HomeComponent },
  { path: 'student',  component: StudentComponent },
  { path: 'student/edit/:id', component: StudentFormComponent },
  { path: 'student/add', component: StudentFormComponent },

  { path: 'major',  component: MajorComponent },
  { path: 'major/edit/:id', component: MajorFormComponent },
  { path: 'major/add', component: MajorFormComponent },

  { path: 'class',  component: ClassComponent },
  { path: 'class/edit/:id', component: ClassFormComponent },
  { path: 'class/add', component: ClassFormComponent },

  { path: 'grade',  component: GradeComponent },
  { path: 'grade/edit/:id', component: GradeFormComponent },
  { path: 'grade/add', component: GradeFormComponent },

  { path: 'instructor',  component: InstructorComponent },
  { path: 'instructor/edit/:id', component: InstructorFormComponent },
  { path: 'instructor/add', component: InstructorFormComponent },

  { path: 'assignment',  component: AssignmentComponent },
  { path: 'assignment/edit/:id', component: AssignmentFormComponent },
  { path: 'assignment/add', component: AssignmentFormComponent },

  { path: 'studentClass',  component: StudentClassComponent },
  { path: 'studentClass/edit/:id', component: StudentClassFormComponent },
  { path: 'studentClass/add', component: StudentClassFormComponent },

  { path: 'majorClass',  component: MajorClassComponent },
  { path: 'majorClass/edit/:id', component: MajorClassFormComponent },
  { path: 'majorClass/add', component: MajorClassFormComponent },
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
