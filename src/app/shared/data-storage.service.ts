import {HttpClient, HttpHeaders} from '@angular/common/http';
import {UniversityService} from '../university/university.service';
import {Injectable} from '@angular/core';
import {UniversityModel} from '../university/university.model';
import {Subject} from 'rxjs';
import {SchoolModel} from '../university/school.model';

@Injectable()
export class DataStorageService {

  constructor(private httpClient: HttpClient) {  }

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
}
