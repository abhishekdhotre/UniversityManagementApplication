import { Component, OnInit } from '@angular/core';
import {RoleService} from '../../role/role.service';
import {RoleModel} from '../../role/role.model';
import {Subscription} from 'rxjs';
import {UserModel} from '../user.model';
import {UserService} from '../user.service';
import {RoleUserModel} from '../../shared/role-user.model';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {
  users: UserModel[];
  roles: RoleModel[];
  user: UserModel;
  role: RoleModel;
  subscriptionUser: Subscription;
  subscriptionRole: Subscription;
  roleSelected = false;
  userSelected = false;
  formValid = false;
  alreadyMapped = false;
  allowDelete = true;
  constructor(private userService: UserService,
              private roleService: RoleService) { }

  ngOnInit() {
    this.subscriptionUser = this.userService.userUpdated.subscribe(
      (users: UserModel[]) => {
        this.users = users;
      }
    );
    this.userService.getUsers();

    this.subscriptionRole = this.roleService.roleUpdated.subscribe(
      (roles: RoleModel[]) => {
        this.roles = roles;
      }
    );
    this.roleService.getRoles();
  }

  onRoleSelected(role: RoleModel) {
    this.roleSelected = true;
    this.role = role;
    if (this.role != null && this.user != null) {
      this.formValid = true;
    }
  }

  onUserSelected(user: UserModel) {
    this.userSelected = true;
    this.user = user;
    if (this.user != null && this.role != null) {
      this.formValid = true;
    }
  }

  onMapClick() {
    if (this.role != null && this.user != null) {
      this.allowDelete = true;
      const RoleUser = new RoleUserModel(this.role.id, this.user.id);
      try {
        this.userService.getSingleRoleUserMapping(new RoleUserModel(this.role.id, this.user.id)).subscribe(
          (roleUserModel: RoleUserModel) => {
            if (roleUserModel.roleId !== 0) {
              this.alreadyMapped = true;
            } else {
              this.alreadyMapped = false;
              this.userService.addRoleUserMapping(RoleUser);
            }
          }
        );
      } catch (Exception) {
        console.log('caught exception');
      }
    }
  }

  onDeleteClick() {
    if (this.role != null && this.user != null) {
      this.alreadyMapped = false;
      const RoleUser = new RoleUserModel(this.role.id, this.user.id);
      try {
        this.userService.getSingleRoleUserMapping(new RoleUserModel(this.role.id, this.user.id)).subscribe(
          (roleUserModel: RoleUserModel) => {
            if (roleUserModel.roleId !== 0) {
              this.allowDelete = true;
              this.userService.deleteRoleUsersMapping(RoleUser);
            } else {
              this.allowDelete = false;
            }
          }
        );
      } catch (Exception) {
        console.log('caught exception');
      }
    }
  }

}
