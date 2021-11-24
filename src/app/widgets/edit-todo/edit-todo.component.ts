import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Location} from '@angular/common';

import { Apollo } from 'apollo-angular';
import { GET_TASK_BY_ID, GET_TASKS } from '../../graghql'
import { Task } from '../../_types/todo'

import { convertDate, timeAgo } from '../../../helpers/date'
import { priorityOptions, progressOptions } from '../../../helpers/constants'

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {
  
  @Input() taskId: string;
  @Input() whereQuery: any;
  form: FormGroup;

  options = {
    priorityOptions,
    progressOptions
  }

  loading: boolean = true
  task: Task = null

  constructor(private _builder: FormBuilder, private _apollo: Apollo, private _location: Location) { 
    this.form = this._builder.group({
      title: [
        this.task?.title,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(25),
        ],
      ],
      description: [
        this.task?.description,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      type: [this.task?.type, Validators.required],
      priority: [this.task?.priority, Validators.required],
      progress: [this.task?.progress, Validators.required],
    })
  }

  ngOnInit() {
    this._apollo.watchQuery<any>({
      query: GET_TASK_BY_ID,
      variables: { id: this.taskId }
    })
    .valueChanges
    .subscribe(({ data, loading }) => {
        const todoData: Task = data.task_by_pk
        this.task = todoData
        this.form.patchValue(todoData)
        this.loading = loading
   });
  }

  // handleUpdateTask = () => {
  //   const { title, description, type, priority, progress, updated_at } = this.form.value

  //   this._apollo.mutate<any>({
  //     mutation: UPDATE_TASK,
  //     variables: {
  //       id: this.task.id,
  //       title: title,
  //       description: description,
  //       type: type,
  //       priority: priority,
  //       progress: progress,
  //       update_at: updated_at
  //     },
  //    update: (cache) => {
  //       const where = this.whereQuery

  //       const existingTasks : Task[] = cache.readQuery({ 
  //         query: GET_TASKS,
  //         variables: { where }
  //       });

  //       console.log(existingTasks);
        
  //       // const newTasks = existingTasks.task.map(tas => {
  //       //   if (t.id === this.todo.id) {
  //       //     return({...t, is_completed: !t.is_completed});
  //       //   } else {
  //       //     return t;
  //       //   }
  //       // });

  //       // cache.writeQuery({
  //       //   query: GET_MY_TODOS,
  //       //   data: { todos: newTodos }
  //       // });
  //     },
  //   }).subscribe(({ data }) => {
  //     console.log('got data', data);
  //   },(error) => {
  //     console.log('there was an error sending the query', error);
  //   });
  // };

  handleConvertDate = (date: string) => convertDate(date)
  handleTimeAgo = (date: string) => timeAgo(date)

  handleGoBack = () => this._location.back();

}
