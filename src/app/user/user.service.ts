import {Subject} from 'rxjs';
import {DataStorageService} from '../shared/data-storage.service';
import {Injectable} from '@angular/core';
import {UserModel} from './user.model';
import {RoleUserDto} from '../shared/role-user-dto';
import {RoleUserModel} from '../shared/role-user.model';

@Injectable()
export class UserService {
  userUpdated = new Subject<UserModel[]>();
  roleUserMappingUpdated = new Subject<RoleUserDto[]>();
  startedEditing = new Subject<number>();
  constructor(private dataStorageService: DataStorageService) { }

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

  getUser(id: number) {
    return this.dataStorageService.getUser(id);
  }

  getUserModel(id: number) {
    return this.users.find(function (obj) { return obj.id === id; });
  }

  addUser(userModel: UserModel) {
    return this.dataStorageService.addUser(userModel).subscribe(
      (response) => {
        this.getUsers();
      });
  }

  updateUser(index: number, userModel: UserModel) {
    return this.dataStorageService.updateUser(index, userModel).subscribe(
      (response) => {
        this.getUsers();
        this.getRoleUsersMapping();
      });
  }

  deleteUser(id) {
    return this.dataStorageService.deleteUser(id).subscribe(
      (response) => {
        this.getUsers();
      });
  }

  setUsers(userModel: UserModel[]) {
    this.users = userModel;
    this.updateUserList();
  }

  updateUserList() {
    this.userUpdated.next(this.users.slice());
  }

  addRoleUserMapping(roleUser: RoleUserModel) {
    return this.dataStorageService.addRoleUser(roleUser).subscribe(
      (response) => {
        this.getRoleUsersMapping();
      });
  }

  deleteRoleUsersMapping(roleUser: RoleUserModel) {
    return this.dataStorageService.deleteRoleUser(roleUser).subscribe(
      (response) => {
        this.getRoleUsersMapping();
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
}
