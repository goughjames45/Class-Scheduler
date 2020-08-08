import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ClassService } from '../classes.service';

@Component({
  selector: 'app-class-scheduler',
  templateUrl: './class-scheduler.component.html',
  styleUrls: ['./class-scheduler.component.css']
})
export class ClassSchedulerComponent implements OnInit {
  searchCourseForm: FormGroup;
  selectedCourse;
  classSchedule: any[] = [];
  currPassingProbability = 100;

  constructor(private formBuilder: FormBuilder,private classesModel: ClassService) { }


  ngOnInit(): void {
    this.searchCourseForm = this.formBuilder.group({
      course: ['', Validators.required],
    });
  }

  searchCourses() {
    if (!this.searchCourseForm.valid) return;
    const title = this.searchCourseForm.get('course').value;
    this.selectedCourse = this.classesModel.getClassByTitle(title);
  }

  addToSchedule() {
    this.classSchedule.push(this.selectedCourse);
    console.log('clicked', this.classSchedule)
  }

  calcGradeProbability(minGrade) {
    let total: number = 0;
    let passing: number = 0;

    Object.keys(this.selectedCourse.grades).forEach(grade => {
      total += parseInt(this.selectedCourse.grades[grade]);
      if(grade <= minGrade.toLowerCase() && grade !== "other") {
        passing += parseInt(this.selectedCourse.grades[grade]);
        debugger;
      }
    })
    let prob = passing / total;
    this.currPassingProbability = Math.floor(this.currPassingProbability*prob);
    
  }

}
