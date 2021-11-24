import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject, combineLatest } from 'rxjs';
import { map, pluck, switchMap, debounceTime, distinctUntilChanged, filter as filterRx } from 'rxjs/operators';

import { Apollo } from 'apollo-angular';

import { Task } from '../../_types/todo'
import { priorityHash, progressHash } from '../../../helpers/data'

import { GET_TASKS } from '../../graghql'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  
  createModalActive: boolean = false;
  queryFilter: any;
  editModal = {
    active: false,
    id: null
  }
  whereQuery: any = null;
  
  allTodosRx: BehaviorSubject<Task[]> = new BehaviorSubject([]);
  assignedTodosRx: BehaviorSubject<Task[]> = new BehaviorSubject([]);
  committedTodosRx: BehaviorSubject<Task[]> = new BehaviorSubject([]);
  inProgressTodosRx: BehaviorSubject<Task[]> = new BehaviorSubject([]);
  completedTodosRx: BehaviorSubject<Task[]> = new BehaviorSubject([]);

  search: BehaviorSubject<string> = new BehaviorSubject('')
  filter: BehaviorSubject<any> = new BehaviorSubject('')

  constructor(private _apollo: Apollo, private _route: ActivatedRoute) { }

  ngOnInit() {
    const { queryParams } = this._route;

    // checks for route queries
    queryParams.subscribe((params) => {
      const { task, filter } = params;

      this.queryFilter = filter;

      if (task === 'new') {
        this.createModalActive = true
      } else if (task) {
        this.editModal = {
          active: true,
          id: task
        }
      } else {
        this.createModalActive = false
        this.editModal = {
          active: false,
          id: null
        }
      }

    this.allTodosRx.pipe(map(todos => todos.filter(todo => todo.progress === 1))).subscribe(items => this.assignedTodosRx.next(items))
    this.allTodosRx.pipe(map(todos => todos.filter(todo => todo.progress === 2))).subscribe(items => this.committedTodosRx.next(items))
    this.allTodosRx.pipe(map(todos => todos.filter(todo => todo.progress === 3))).subscribe(items => this.inProgressTodosRx.next(items))
    this.allTodosRx.pipe(map(todos => todos.filter(todo => todo.progress === 4))).subscribe(items => this.completedTodosRx.next(items))

    queryParams.pipe(filterRx(data => data.filter != null), pluck('filter')).subscribe(q => this.filter.next(q))

    const queryParameters$ = combineLatest([
      this.search.pipe(debounceTime(500),distinctUntilChanged()), 
      this.filter.pipe(),
    ])
    .pipe(map(([search, filter]) => {
      const where: any = {}
      const and = []

      if (search) {
        and.push({ title: { _ilike: `%${search}%` } })
      }
      if (filter) {
        const priority = priorityHash[filter]
        const progress = progressHash[filter] 
        priority ? and.push({ priority: { _eq: priority } }) : null
        progress ? and.push({ progress: { _eq: progress } }) : null
      }
      if (search || filter) {
        where._and = and;
      }
      this.whereQuery = where;
      return where
    }))

    queryParameters$.pipe(
      switchMap(value => this.handleQuery(value)),
      pluck("data"), pluck("task")
    ).subscribe((items: Task[]) => {
      this.allTodosRx.next(items)
    })

    });
  }

  find = ($event: string) => {
    this.search.next($event)
  }

  handleQuery = (where: any) => (
    this._apollo.query<any>({
      query: GET_TASKS,
      variables: { where }
    })
  )

}
