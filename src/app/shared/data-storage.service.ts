import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UniversityModel} from '../university/university.model';
import {SchoolModel} from '../university/school.model';
import {RoleModel} from '../role/role.model';
import {UserModel} from '../user/user.model';
import {UniversityRoleModel} from './university-role.model';
import {UniversityRoleDtoModel} from './university-role-dto.model';
import {RoleUserModel} from './role-user.model';
import {RoleUserDto} from './role-user-dto';

@Injectable()
export class DataStorageService {

  // apiUrlLocalhost = 'http://localhost:53447/api/'
  apiUrlAWS = 'http://universitymanagementservice-dev.us-east-2.elasticbeanstalk.com/api/';
  constructor(private httpClient: HttpClient) {  }

  // University, School and Department
  getUniversities() {
    return this.httpClient.get<UniversityModel[]>(this.apiUrlAWS + 'university');
  }

  getUniversity(i) {
    return this.httpClient.get<UniversityModel>(this.apiUrlAWS + 'university/' + i);
  }

  addUniversities(universityModel: UniversityModel) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(this.apiUrlAWS + 'university'
      , universityModel, { headers });
  }

  updateUniversities(index: number, universityModel: UniversityModel) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(this.apiUrlAWS + 'university/' + index
      , universityModel, { headers });
  }

  deleteUniversities(i) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.delete(this.apiUrlAWS + 'university/' + i, { headers });
  }

  updateSchools(schoolId: number, schoolModel: SchoolModel) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(this.apiUrlAWS + 'school/' + schoolId
      , schoolModel, { headers });
  }

  // Roles
  getRoles() {
    return this.httpClient.get<RoleModel[]>(this.apiUrlAWS + 'role');
  }

  addRole(roleModel: RoleModel) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(this.apiUrlAWS + 'role'
      , roleModel, { headers });
  }

  updateRole(index: number, roleModel: RoleModel) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(this.apiUrlAWS + 'role/' + index
      , roleModel, { headers });
  }

  deleteRole(i) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.delete(this.apiUrlAWS + 'role/' + i, { headers });
  }

  addUniversityRole(universityRoleModel: UniversityRoleModel) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(this.apiUrlAWS + 'universityrole'
      , universityRoleModel, { headers });
  }

  deleteUniversityRole(universityRoleModel: UniversityRoleModel) {
    return this.httpClient.delete(this.apiUrlAWS + 'universityrole/'
      + universityRoleModel.universityId + '/' + universityRoleModel.roleId);
  }

  getUniversityRoleMapping() {
    return this.httpClient.get<UniversityRoleDtoModel[]>(this.apiUrlAWS + 'universityrole');
  }

  getSingleUniversityRoleMapping(universityRoleModel: UniversityRoleModel) {
    return this.httpClient.get<UniversityRoleModel>(this.apiUrlAWS + 'universityrole/'
      + universityRoleModel.universityId + '/' + universityRoleModel.roleId);
  }

  // Users
  getUsers() {
    return this.httpClient.get<UserModel[]>(this.apiUrlAWS + 'user');
  }

  addUser(userModel: UserModel) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(this.apiUrlAWS + 'user'
      , userModel, { headers });
  }

  updateUser(id: number, userModel: UserModel) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put(this.apiUrlAWS + 'user/' + id
      , userModel, { headers });
  }

  deleteUser(i) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.delete(this.apiUrlAWS + 'user/' + i, { headers });
  }

  addRoleUser(roleUserModel: RoleUserModel) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(this.apiUrlAWS + 'roleuser'
      , roleUserModel, { headers });
  }

  deleteRoleUser(roleUserModel: RoleUserModel) {
    return this.httpClient.delete(this.apiUrlAWS + 'roleuser/'
      + roleUserModel.roleId + '/' + roleUserModel.userId);
  }

  getRoleUserMapping() {
    return this.httpClient.get<RoleUserDto[]>(this.apiUrlAWS + 'roleuser');
  }

  getSingleRoleUserMapping(roleUserModel: RoleUserModel) {
    return this.httpClient.get<RoleUserModel>(this.apiUrlAWS + 'roleuser/'
      + roleUserModel.roleId + '/' + roleUserModel.userId);
  }
}
