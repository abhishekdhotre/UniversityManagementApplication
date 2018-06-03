import { Component, OnInit } from '@angular/core';
import {RoleModel} from '../role.model';
import {RoleService} from '../role.service';
import {Subscription} from 'rxjs';
import {UniversityService} from '../../university/university.service';
import {UniversityModel} from '../../university/university.model';
import {UniversityRoleModel} from '../../university-role.model';
import {UniversityRoleDtoModel} from '../../university-role-dto.model';

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
  formValid = false;
  alreadyMapped = false;
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
    if (this.role != null && this.university != null) {
      this.formValid = true;
    }
  }

  onRoleSelected(role: RoleModel) {
    this.roleSelected = true;
    this.role = role;
    if (this.role != null && this.university != null) {
      this.formValid = true;
    }
  }

  onMapClick() {
    if (this.role != null && this.university != null) {
      const UniversityRole = new UniversityRoleModel(this.university.id, this.role.id);
      try {
        this.roleService.getSingleUniversityRoleMapping(new UniversityRoleModel(this.university.id, this.role.id)).subscribe(
          (universityRoleModel: UniversityRoleModel) => {
            if (universityRoleModel.universityId !== 0) {
              this.alreadyMapped = true;
            } else {
              console.log('in else');
              this.alreadyMapped = false;
              this.roleService.addUniversityRoleMapping(UniversityRole);
            }
          }
        );
      } catch (Exception) {
        console.log('caught exception');
      }
    }
  }
}
