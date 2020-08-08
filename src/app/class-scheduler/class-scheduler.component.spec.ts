import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSchedulerComponent } from './class-scheduler.component';

describe('ClassSchedulerComponent', () => {
  let component: ClassSchedulerComponent;
  let fixture: ComponentFixture<ClassSchedulerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassSchedulerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
