import {RoleModel} from './role.model';
import {Subject} from 'rxjs';
import {DataStorageService} from '../shared/data-storage.service';
import {Injectable} from '@angular/core';

@Injectable()
export class RoleService {
  roleUpdated = new Subject<RoleModel[]>();
  startedEditing = new Subject<number>();
  constructor(private dataStorageService: DataStorageService) { }

  private roles: RoleModel[];

  getRoles() {
    this.dataStorageService.getRoles()
      .subscribe(
        (roles: RoleModel[]) => {
          this.roles = roles;
          this.updateRoleList();
        }
      );
  }

  getRole(id: number) {
    return this.dataStorageService.getRole(id);
  }

  getRoleModel(id: number) {
    return this.roles.find(function (obj) { return obj.id === id; });
  }

  addRole(roleModel: RoleModel) {
    return this.dataStorageService.addRole(roleModel).subscribe(
      (response) => {
        this.getRoles();
      });
  }

  updateRole(index: number, roleModel: RoleModel) {
    return this.dataStorageService.updateRole(index, roleModel).subscribe(
      (response) => {
        this.getRoles();
      });
  }

  deleteRole(id) {
    return this.dataStorageService.deleteRole(id).subscribe(
      (response) => {
        this.getRoles();
      });
  }

  setRoles(roleModels: RoleModel[]) {
    this.roles = roleModels;
    this.updateRoleList();
  }

  updateRoleList() {
    this.roleUpdated.next(this.roles.slice());
  }
}
