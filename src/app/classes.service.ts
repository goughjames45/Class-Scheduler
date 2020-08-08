import { Injectable } from '@angular/core';
import { BehaviorSubject, Observer } from 'rxjs';

export class ClassInfo {
  id: number;
  title: string;
}

export class Class {
  id: number;
  title: string;
  text: string;
  grades: {
    a: number;
    b: number;
    c: number;
    d: number;
    f: number;
    w: number;
    other: number;
  }
}

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private classes: Class[];
  private nextId = 0;
  private classesSubject = new BehaviorSubject<ClassInfo[]>([]);

  constructor() {
    this.classes = JSON.parse(localStorage.getItem('classes')) || [];
    for (const note of this.classes) {
      if (note.id >= this.nextId) this.nextId = note.id+1;
    }
    this.update();
  }

  subscribe(observer: Observer<ClassInfo[]>) {
    this.classesSubject.subscribe(observer);
  }

  addClass(title: string, text: string, grades): Class {
    console.log(grades);
    const course = {id: this.nextId++, title, text, grades: grades};
    this.classes.push(course);
    this.update();
    return course;
  }

  getClass(id: number): Class {
    const index = this.findIndex(id);
    return this.classes[index];
  }

  getClassByTitle(title: string): Class {
    let found;
    this.classes.forEach(c => {
      if(c.title == title){
        found = c;
      }
    })
    return found;
  }

  updateClass(id: number, title: string, text: string) {
    const index = this.findIndex(id);
    this.classes[index] = {id, title, text, grades: {a: -1, b: -1, c: -1, d: -1, f: -1, w: -1, other: -1}};
    this.update();
  }

  deleteClass(id: number) {
    const index = this.findIndex(id);
    this.classes.splice(index, 1);
    this.update();
  }

  private update() {
    localStorage.setItem('classes', JSON.stringify(this.classes));
    this.classesSubject.next(this.classes.map(
      note => ({id: note.id, title: note.title})
    ));
  }

  private findIndex(id: number): number {
    for (let i=0; i<this.classes.length; i++) {
      if (this.classes[i].id === id) return i;
    }
    throw new Error(`Class with id ${id} was not found!`);
  }
}
