import { Component, Input, OnInit } from '@angular/core';

import { Task } from '../../_types/todo'
import { convertDate, timeAgo } from '../../../helpers/date'

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrls: ['./todo-card.component.scss']
})
export class TodoCardComponent implements OnInit {
  
  @Input() task: Task;

  constructor() { }

  ngOnInit() {
  }

  handleConvertDate = (date: string) => convertDate(date)
  handleTimeAgo = (date: string) => timeAgo(date)

}
