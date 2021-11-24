/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { EditTodoComponent } from './edit-todo.component';

describe('EditTodoComponent', () => {
  let component: EditTodoComponent;
  let fixture: ComponentFixture<EditTodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
