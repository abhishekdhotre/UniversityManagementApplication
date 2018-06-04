import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { DropdownDirective } from './shared/dropdown.directive';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { UniversityComponent } from './university/university.component';
import { UniversityDetailComponent } from './university/university-detail/university-detail.component';
import { UniversityEditComponent } from './university/university-edit/university-edit.component';
import { UniversityListComponent } from './university/university-list/university-list.component';
import { UniversityStartComponent } from './university/university-start/university-start.component';
import { UniversityItemComponent } from './university/university-list/university-item/university-item.component';
import {UniversityService} from './university/university.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SchoolEditComponent} from './university/school-edit/school-edit.component';
import {DataStorageService} from './shared/data-storage.service';
import { RoleComponent } from './role/role.component';
import { RoleEditComponent } from './role/role-edit/role-edit.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleManageComponent } from './role/role-manage/role-manage.component';
import { UserComponent } from './user/user.component';
import {RoleService} from './role/role.service';
import { RoleMappingListComponent } from './role/role-mapping-list/role-mapping-list.component';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserManageComponent } from './user/user-manage/user-manage.component';
import { UserMappingListComponent } from './user/user-mapping-list/user-mapping-list.component';
import {UserService} from './user/user.service';
import {MatCardModule, MatProgressSpinnerModule, MatSnackBarModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SnackBarComponent } from './snack-bar/snack-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DropdownDirective,
    UniversityComponent,
    UniversityDetailComponent,
    UniversityEditComponent,
    UniversityListComponent,
    UniversityStartComponent,
    UniversityItemComponent,
    SchoolEditComponent,
    RoleComponent,
    RoleEditComponent,
    RoleListComponent,
    RoleManageComponent,
    UserComponent,
    RoleMappingListComponent,
    UserEditComponent,
    UserListComponent,
    UserManageComponent,
    UserMappingListComponent,
    SnackBarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    Ng2SmartTableModule,
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatCardModule
  ],
  entryComponents: [SnackBarComponent],
  providers: [DataStorageService, UniversityService, RoleService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
