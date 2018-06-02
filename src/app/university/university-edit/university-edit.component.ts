import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {UniversityService} from '../university.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-university-edit',
  templateUrl: './university-edit.component.html',
  styleUrls: ['./university-edit.component.scss']
})
export class UniversityEditComponent implements OnInit {
  id: number;
  editMode = false;
  universityForm: FormGroup;
  constructor(private activeRoute: ActivatedRoute,
              private universityService: UniversityService,
              private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.InitForm();
      }
    );
  }

  onSubmit() {
    if (this.editMode) {
      this.universityService.updateUniversity(this.id, this.universityForm.value);
      this.onEdit();
    } else {
      this.universityService.addUniversity(this.universityForm.value);
      this.onCancel();
    }
  }

  private InitForm() {
    let Name = '';
    let Description = '';
    let ImagePath = '';
    const Schools = new FormArray([]);
    if (this.editMode) {
      const university = this.universityService.getUniversityModel(this.id);
      Name = university.name;
      Description = university.description;
      ImagePath = university.imagePath;
      if (university.schools.length > 0) {
        console.log(university);
        for (const school of university.schools) {
          const Departments = new FormArray([]);
          if ('departments' in school) {
            if (school.departments.length > 0) {
              for (const department of school.departments) {
                Departments.push(new FormGroup({'name': new FormControl(department.name)}));
              }
            }
          }
          Schools.push(
            new FormGroup({
              'id': new FormControl(school.id, Validators.required),
              'name': new FormControl(school.name, Validators.required),
              'departments': Departments
            })
          );
        }
      }
    }
    this.universityForm = new FormGroup({
      'name' : new FormControl(Name, Validators.required),
      'description' : new FormControl(Description, Validators.required),
      'imagePath' : new FormControl(ImagePath, Validators.required),
      'schools': Schools
    });
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.activeRoute } );
  }

  onEdit() {
    this.router.navigate(['../../'], { relativeTo: this.activeRoute } );
  }

  onManageSchools(i) {
      this.router.navigate([i + '/school'], { relativeTo: this.activeRoute });
  }

  onAddSchool() {
    (<FormArray>this.universityForm.get('schools')).push(new FormGroup({
      'name': new FormControl(null, Validators.required)
    }));
  }

  onSchoolDelete(i) {
    (<FormArray>this.universityForm.get('schools')).removeAt(i);
  }
}
