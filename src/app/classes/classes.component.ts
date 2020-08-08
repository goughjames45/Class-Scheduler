import { Component, OnInit } from '@angular/core';
import { Class, ClassInfo, ClassService } from '../classes.service';
import { BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-classes',
  templateUrl: './classes.component.html',
  styleUrls: ['./classes.component.css']
})
export class ClassesComponent implements OnInit {
  classes = new BehaviorSubject<ClassInfo[]>([]);
  currentClass: Class = {id:-1, title: '', text:'', grades: {a: -1, b: -1, c: -1, d: -1, f: -1, w: -1, other: -1}};
  createClass = false;
  editClass = false;
  editClassForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private classesModel: ClassService) { }

  ngOnInit() {
    this.classesModel.subscribe(this.classes);
    this.editClassForm = this.formBuilder.group({
      title: ['', Validators.required],
      text: ['', Validators.required],
      A: [],
      B: [],
      C: [],
      D: [],
      F: [],
      W: [],
      Other: []
    });
  }

  onSelectClass(id: number) {
    this.currentClass = this.classesModel.getClass(id);
  }

  classSelected(): boolean {
    return this.currentClass.id >= 0;
  }

  onNewClass() {
    this.editClassForm.reset();
    this.createClass = true;
    this.editClass = true;
  }

  onEditClass() {
    if (this.currentClass.id < 0) return;
    this.editClassForm.get('title').setValue(this.currentClass.title);
    this.editClassForm.get('text').setValue(this.currentClass.text);
    this.createClass = false;
    this.editClass = true;
  }

  onDeleteClass() {
    if (this.currentClass.id < 0) return;
    this.classesModel.deleteClass(this.currentClass.id);
    this.currentClass = {id:-1, title: '', text:'', grades: {a: -1, b: -1, c: -1, d: -1, f: -1, w: -1, other: -1}};
    this.editClass = false;
  }

  updateClass() {
    if (!this.editClassForm.valid) return;
    const title = this.editClassForm.get('title').value;
    const text = this.editClassForm.get('text').value;
    const grades = {
      a: this.editClassForm.get('A').value,
      b: this.editClassForm.get('B').value,
      c: this.editClassForm.get('C').value,
      d: this.editClassForm.get('D').value,
      f: this.editClassForm.get('F').value,
      w: this.editClassForm.get('W').value,
      other: this.editClassForm.get('Other').value,
    }
    if (this.createClass) {
      this.currentClass = this.classesModel.addClass(title, text, grades);
    } else {
      const id = this.currentClass.id;
      this.classesModel.updateClass(id, title, text);
      this.currentClass = {id, title, text, grades: {a: -1, b: -1, c: -1, d: -1, f: -1, w: -1, other: -1}};
    }
    this.editClass = false;
  }
}