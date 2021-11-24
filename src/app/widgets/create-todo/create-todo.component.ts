import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';

import { Apollo } from 'apollo-angular';
import { CREATE_TASK, GET_TASKS } from '../../graghql'

@Component({
  selector: 'app-create-todo',
  templateUrl: './create-todo.component.html',
  styleUrls: ['./create-todo.component.scss']
})
export class CreateTodoComponent implements OnInit {

  @Input() whereQuery: any;
  form: FormGroup;
  loading: boolean = false;

  constructor(private _builder: FormBuilder, private _location: Location, private _apollo: Apollo) { 
    this.form = this._builder.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      type: [1, Validators.required],
      priority: [1, Validators.required],
      progress: [1, Validators.required],
    })
  }

  ngOnInit() {}

  handleGoBack = () => this._location.back();

  handleSubmit = () => {
    if (this.form.valid) {
      const { title, description, type, priority, progress } = this.form.value
      
      this._apollo.mutate<any>({
        mutation: CREATE_TASK,
        variables: {
          title: title,
          description: description,
          type: type,
          priority: priority,
          progress: progress
        }, 
        update: (cache, {data}) => {
          const where = this.whereQuery
        
          const existingTasks : any = cache.readQuery({
            query: GET_TASKS,
            variables: { where }
          });

          const newTask = data.insert_task.returning[0];

          cache.writeQuery({
            query: GET_TASKS,
            variables: { where },
            data: {task: [newTask, ...existingTasks.task]}
          });
        }
      })
      .subscribe(() =>  {
        this.handleGoBack()
      }),
      (error) => {
        console.log('there was an error sending the query', error);
      };
    }
    else{
      alert("FILL ALL FIELDS")
    }
  }

}
