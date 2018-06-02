import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UniversityComponent} from './university/university.component';
import {UniversityDetailComponent} from './university/university-detail/university-detail.component';
import {UniversityEditComponent} from './university/university-edit/university-edit.component';
import {UniversityStartComponent} from './university/university-start/university-start.component';
import {SchoolEditComponent} from './university/school-edit/school-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/university', pathMatch: 'full' },
  { path: 'university', component: UniversityComponent, children: [
      { path: '', component: UniversityStartComponent },
      { path: 'new', component: UniversityEditComponent },
      { path: ':id', component: UniversityDetailComponent },
      { path: ':id/edit', component: UniversityEditComponent },
      { path: ':id/edit/:schoolId/school', component: SchoolEditComponent },
      ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
