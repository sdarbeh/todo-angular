import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {

  @Output() search = new EventEmitter()
  queryFilter: any;

  filterOpen: boolean = false;
  form: FormGroup

  constructor(private _builder: FormBuilder, private _route: ActivatedRoute) {
    this.form = this._builder.group({
      search: ''
    })
    const search = this.form.get('search')
    search.valueChanges.subscribe(value => this.search.emit(value))
   }

  ngOnInit() {
    const { queryParams } = this._route;

    // checks for route queries
    queryParams.subscribe((params) => {
      const { filter } = params;
      this.queryFilter = filter;
    
      if (filter) {
        this.filterOpen = true
      } else {
        this.filterOpen = false
      }
    })
    
  }

  handleToggleFilter = () => this.filterOpen = !this.filterOpen

  handleSearchBtnClick = () => {
    // Search icon w/o value, X with value
    this.form.controls.search.setValue('')
  }

}
