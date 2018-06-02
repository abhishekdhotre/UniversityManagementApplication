import { Component, OnInit } from '@angular/core';
import {RoleModel} from '../role.model';
import {RoleService} from '../role.service';
import {Subscription} from 'rxjs';
import {UniversityService} from '../../university/university.service';
import {UniversityModel} from '../../university/university.model';

@Component({
  selector: 'app-role-manage',
  templateUrl: './role-manage.component.html',
  styleUrls: ['./role-manage.component.scss']
})
export class RoleManageComponent implements OnInit {
  roles: RoleModel[];
  universities: UniversityModel[];
  subscriptionRole: Subscription;
  subscriptionUniversity: Subscription;
  university: UniversityModel;
  role: RoleModel;
  universitySelected = false;
  roleSelected = false;
  constructor(private roleService: RoleService,
              private universityService: UniversityService) { }

  ngOnInit() {
    this.subscriptionRole = this.roleService.roleUpdated.subscribe(
      (roles: RoleModel[]) => {
        this.roles = roles;
      }
    );
    this.roleService.getRoles();

    this.subscriptionUniversity = this.universityService.universityUpdated.subscribe(
      (universities: UniversityModel[]) => {
        this.universities = universities;
      }
    );
    this.universityService.getUniversities();
  }

  onUniversitySelected(university: UniversityModel) {
    this.universitySelected = true;
    this.university = university;
  }

  onRoleSelected(role: RoleModel) {
    this.roleSelected = true;
    this.role = role;
  }
}
