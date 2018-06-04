import {Subject} from 'rxjs';
import {DataStorageService} from '../shared/data-storage.service';
import {Injectable} from '@angular/core';
import {UserModel} from './user.model';
import {RoleUserDto} from '../shared/role-user-dto';
import {RoleUserModel} from '../shared/role-user.model';
import {SnackBarComponent} from '../snack-bar/snack-bar.component';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class UserService {
  userUpdated = new Subject<UserModel[]>();
  roleUserMappingUpdated = new Subject<RoleUserDto[]>();
  startedEditing = new Subject<number>();
  constructor(private dataStorageService: DataStorageService,
              private snackBar: MatSnackBar) { }

  private users: UserModel[];
  private roleUserMapping: RoleUserDto[];

  getUsers() {
    this.dataStorageService.getUsers()
      .subscribe(
        (users: UserModel[]) => {
          this.users = users;
          this.updateUserList();
        }
      );
  }

  getUserModel(id: number) {
    return this.users.find(function (obj) { return obj.id === id; });
  }

  addUser(userModel: UserModel) {
    return this.dataStorageService.addUser(userModel).subscribe(
      () => {
        this.getUsers();
        this.openSnackBar('Added User successfully!');
      });
  }

  updateUser(index: number, userModel: UserModel) {
    return this.dataStorageService.updateUser(index, userModel).subscribe(
      () => {
        this.getUsers();
        this.getRoleUsersMapping();
        this.openSnackBar('Updated User successfully!');
      });
  }

  deleteUser(id) {
    return this.dataStorageService.deleteUser(id).subscribe(
      () => {
        this.getUsers();
        this.openSnackBar('Deleted User successfully!');
      });
  }

  updateUserList() {
    this.userUpdated.next(this.users.slice());
  }

  addRoleUserMapping(roleUser: RoleUserModel) {
    return this.dataStorageService.addRoleUser(roleUser).subscribe(
      () => {
        this.getRoleUsersMapping();
        this.openSnackBar('Added mapping successfully!');
      });
  }

  deleteRoleUsersMapping(roleUser: RoleUserModel) {
    return this.dataStorageService.deleteRoleUser(roleUser).subscribe(
      () => {
        this.getRoleUsersMapping();
        this.openSnackBar('Deleted mapping successfully!');
      });
  }

  getSingleRoleUserMapping(roleUser: RoleUserModel) {
    return this.dataStorageService.getSingleRoleUserMapping(roleUser);
  }

  getRoleUsersMapping() {
    this.dataStorageService.getRoleUserMapping()
      .subscribe(
        (roleUserDto: RoleUserDto[]) => {
          this.roleUserMapping = roleUserDto;
          this.updateRoleUserMapping();
        }
      );
  }

  updateRoleUserMapping() {
    this.roleUserMappingUpdated.next(this.roleUserMapping.slice());
  }

  openSnackBar(message) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 1000, data: message
    });
  }
}
