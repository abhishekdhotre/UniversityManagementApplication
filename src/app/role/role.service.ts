import {RoleModel} from './role.model';
import {Subject} from 'rxjs';
import {DataStorageService} from '../shared/data-storage.service';
import {Injectable} from '@angular/core';
import {UniversityRoleModel} from '../shared/university-role.model';
import {UniversityRoleDtoModel} from '../shared/university-role-dto.model';
import {SnackBarComponent} from '../snack-bar/snack-bar.component';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class RoleService {
  roleUpdated = new Subject<RoleModel[]>();
  universityRoleMappingUpdated = new Subject<UniversityRoleDtoModel[]>();
  startedEditing = new Subject<number>();
  constructor(private dataStorageService: DataStorageService,
              private snackBar: MatSnackBar) { }

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

  getRoleModel(id: number) {
    return this.roles.find(function (obj) { return obj.id === id; });
  }

  addRole(roleModel: RoleModel) {
    return this.dataStorageService.addRole(roleModel).subscribe(
      () => {
        this.getRoles();
        this.openSnackBar('Role added successfully!');
      });
  }

  updateRole(index: number, roleModel: RoleModel) {
    return this.dataStorageService.updateRole(index, roleModel).subscribe(
      () => {
        this.getRoles();
        this.getUniversityRolesMapping();
        this.openSnackBar('Role updated successfully!');
      });
  }

  deleteRole(id) {
    return this.dataStorageService.deleteRole(id).subscribe(
      () => {
        this.getRoles();
        this.openSnackBar('Role deleted successfully!');
      });
  }

  updateRoleList() {
    this.roleUpdated.next(this.roles.slice());
  }

  addUniversityRoleMapping(universityRole: UniversityRoleModel) {
    return this.dataStorageService.addUniversityRole(universityRole).subscribe(
      () => {
        this.getUniversityRolesMapping();
        this.openSnackBar('Added Mapping successfully!');
      });
  }

  deleteUniversityRoleMapping(universityRole: UniversityRoleModel) {
    return this.dataStorageService.deleteUniversityRole(universityRole).subscribe(
      () => {
        this.getUniversityRolesMapping();
        this.openSnackBar('Deleted mapping successfully!');
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

  openSnackBar(message) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 1000, data: message
    });
  }
}
