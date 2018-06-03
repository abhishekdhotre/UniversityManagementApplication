import {RoleModel} from './role.model';
import {Subject} from 'rxjs';
import {DataStorageService} from '../shared/data-storage.service';
import {Injectable} from '@angular/core';
import {UniversityRoleModel} from '../university-role.model';
import {UniversityRoleDtoModel} from '../university-role-dto.model';

@Injectable()
export class RoleService {
  roleUpdated = new Subject<RoleModel[]>();
  universityRoleMappingUpdated = new Subject<UniversityRoleDtoModel[]>();
  startedEditing = new Subject<number>();
  constructor(private dataStorageService: DataStorageService) { }

  private roles: RoleModel[];
  private universityRoleMapping: UniversityRoleDtoModel[];

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
        this.getUniversityRolesMapping();
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

  addUniversityRoleMapping(universityRole: UniversityRoleModel) {
    return this.dataStorageService.addUniversityRole(universityRole).subscribe(
      (response) => {
        this.getUniversityRolesMapping();
      });
  }

  getSingleUniversityRoleMapping(universityRole: UniversityRoleModel) {
    return this.dataStorageService.getSingleUniversityRoleMapping(universityRole);
  }

  getUniversityRolesMapping() {
    this.dataStorageService.getUniversityRoleMapping()
      .subscribe(
        (universityRoleDto: UniversityRoleDtoModel[]) => {
          this.universityRoleMapping = universityRoleDto;
          this.updateUniversityRoleMapping();
        }
      );
  }

  updateUniversityRoleMapping() {
    this.universityRoleMappingUpdated.next(this.universityRoleMapping.slice());
  }
}
