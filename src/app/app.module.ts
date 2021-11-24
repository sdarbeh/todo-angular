import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import {MatIconModule} from '@angular/material/icon';

import {HttpClientModule} from '@angular/common/http';
import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {InMemoryCache} from '@apollo/client/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DashboardComponent } from './pages/dashboard/dashboard.component'

import { ActionComponent } from './widgets/action/action.component'
import { TodoCardComponent } from './widgets/todo-card/todo-card.component'
import { CreateTodoComponent } from './widgets/create-todo/create-todo.component'
import { EditTodoComponent } from './widgets/edit-todo/edit-todo.component'

@NgModule({
  declarations: [	
    AppComponent,
    DashboardComponent,
    // widgets
    ActionComponent,
    TodoCardComponent,
    CreateTodoComponent,
    EditTodoComponent
   ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
    ReactiveFormsModule,
    FormsModule,
    // material design
    MatIconModule,
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory(httpLink: HttpLink) {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:8080/v1/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
