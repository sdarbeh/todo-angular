import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// pages
import { DashboardComponent } from './pages/dashboard/dashboard.component'

// widgets


const routes: Routes = [
  { path: '', component: DashboardComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
