
import {Subject} from 'rxjs';
import {UniversityModel} from './university.model';
import {SchoolModel} from './school.model';
import {Injectable} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {SnackBarComponent} from '../snack-bar/snack-bar.component';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class UniversityService {
  universityUpdated = new Subject<UniversityModel[]>();

  constructor(private dataStorageService: DataStorageService,
              private snackBar: MatSnackBar) { }

  private universities: UniversityModel[];

  // Sample data for universities
  /*private universities: UniversityModel[] = [ new UniversityModel(1, 'The University of Texas at Arlington',
    'Test Description 1',
    'https://www.uta.edu/ucomm/identity/pix/UTA_A-logo.jpg',
    [
      new SchoolModel( 1, 'College of Engineering',
        [new DepartmentModel(1, 'Computer Science'),
          new DepartmentModel(2, 'Mechanical')])
      , new SchoolModel( 2, 'College of Education',
      [new DepartmentModel(1, 'Health Science'),
        new DepartmentModel(2, 'Social Services')])]),
    new UniversityModel(2, 'The University of Texas at Dallas',
      'Test Description 2',
      'http://www.freelogovectors.net/wp-content/uploads/2018/03/ut-dallas-logo02.png',
      [
        new SchoolModel( 1, 'College of Business',
          [new DepartmentModel(1, 'Management Information Systems'),
            new DepartmentModel(2, 'Finance Management')])
        , new SchoolModel( 1, 'Medical School',
        [new DepartmentModel(1, 'Anesthesiology')])])];*/

  getUniversities() {
    this.dataStorageService.getUniversities()
      .subscribe(
        (universities: UniversityModel[]) => {
          this.universities = universities;
          this.updateUniversityList();
        }
      );
  }

  getUniversity(id: number) {
    return this.dataStorageService.getUniversity(id);
  }

  getUniversityModel(id: number) {
    return this.universities.find(function (obj) { return obj.id === id; });
  }

  addUniversity(universityModel: UniversityModel) {
    return this.dataStorageService.addUniversities(universityModel).subscribe(
      () => {
        this.getUniversities();
        this.openSnackBar('University added successfully!');
      });
  }

  updateUniversity(index: number, universityModel: UniversityModel) {
    return this.dataStorageService.updateUniversities(index, universityModel).subscribe(
      () => {
        this.getUniversities();
        this.openSnackBar('University updated successfully!');
      });
  }

  deleteUniveristy(id) {
    return this.dataStorageService.deleteUniversities(id).subscribe(
      () => {
        this.getUniversities();
        this.openSnackBar('University delete successfully!');
      });
  }

  getSchool(universityId: number, schoolId: number) {
    return this.universities
      .find(function (obj) { return obj.id === universityId; })
      .schools.find(function (obj) { return obj.id === schoolId; });
  }

  updateSchool(schoolId: number, schoolModel: SchoolModel) {
    return this.dataStorageService.updateSchools(schoolId, schoolModel).subscribe(
      () => {
        this.getUniversities();
        this.openSnackBar('School updated successfully!');
      });
  }

  updateUniversityList() {
    this.universityUpdated.next(this.universities.slice());
  }

  openSnackBar(message) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 1000, data: message
    });
  }
}
