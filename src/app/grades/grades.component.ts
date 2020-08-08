import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ClassService } from '../classes.service';


@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
  searchCourseForm: FormGroup;
  selectedCourse;

  constructor(private formBuilder: FormBuilder,private classesModel: ClassService) { }

  ngOnInit(): void {
    this.searchCourseForm = this.formBuilder.group({
      course: ['', Validators.required],
    });
  }

  searchCourses(){
    if (!this.searchCourseForm.valid) return;
    const title = this.searchCourseForm.get('course').value;
    this.selectedCourse = this.classesModel.getClassByTitle(title);
  }

}
