import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {UniversityModel} from '../university/university.model';
import {SchoolModel} from '../university/school.model';
import {RoleModel} from '../role/role.model';
import {UniversityRoleModel} from '../university-role.model';
import {UniversityRoleDtoModel} from '../university-role-dto.model';

@Injectable()
export class DataStorageService {

  constructor(private httpClient: HttpClient) {  }

  // University, School and Department
  getUniversities() {
    return this.httpClient.get<UniversityModel[]>('http://localhost:53447/api/university');
  }

  getUniversity(i) {
    return this.httpClient.get<UniversityModel>('http://localhost:53447/api/university/' + i);
  }

  addUniversities(universityModel: UniversityModel) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post('http://localhost:53447/api/university'
      , universityModel, { headers });
  }

  updateUniversities(index: number, universityModel: UniversityModel) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put('http://localhost:53447/api/university/' + index
      , universityModel, { headers });
  }

  deleteUniversities(i) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.delete('http://localhost:53447/api/university/' + i, { headers });
  }

  updateSchools(schoolId: number, schoolModel: SchoolModel) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put('http://localhost:53447/api/school/' + schoolId
      , schoolModel, { headers });
  }

  // Roles and Users
  getRoles() {
    return this.httpClient.get<RoleModel[]>('http://localhost:53447/api/role');
  }

  getRole(i) {
    return this.httpClient.get<RoleModel>('http://localhost:53447/api/role/' + i);
  }

  addRole(roleModel: RoleModel) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post('http://localhost:53447/api/role'
      , roleModel, { headers });
  }

  updateRole(index: number, roleModel: RoleModel) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put('http://localhost:53447/api/role/' + index
      , roleModel, { headers });
  }

  deleteRole(i) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.delete('http://localhost:53447/api/role/' + i, { headers });
  }

  addUniversityRole(universityRoleModel: UniversityRoleModel) {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post('http://localhost:53447/api/universityrole'
      , universityRoleModel, { headers });
  }

  getUniversityRoleMapping() {
    return this.httpClient.get<UniversityRoleDtoModel[]>('http://localhost:53447/api/universityrole');
  }

  getSingleUniversityRoleMapping(universityRoleModel: UniversityRoleModel) {
    return this.httpClient.get<UniversityRoleModel>('http://localhost:53447/api/universityrole/'
      + universityRoleModel.universityId + '/' + universityRoleModel.roleId);
  }
}
