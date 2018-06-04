import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {UniversityService} from '../university.service';
import {ActivatedRoute, Params, Router} from '@angular/router';

@Component({
  selector: 'app-school-edit',
  templateUrl: './school-edit.component.html',
  styleUrls: ['./school-edit.component.scss']
})
export class SchoolEditComponent implements OnInit {
  universityId: number;
  schoolId: number;
  Name: string;
  schoolForm: FormGroup;
  get formData() { return <FormArray>this.schoolForm.get('departments'); }
  constructor(private activeRoute: ActivatedRoute,
              private universityService: UniversityService,
              private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(
      (params: Params) => {
        this.universityId = +params['id'];
        this.schoolId = +params['schoolId'];
        this.InitForm();
      }
    );
  }
  private InitForm() {
    const Departments = new FormArray([]);
    const school = this.universityService.getSchool(this.universityId, this.schoolId);
    console.log(school.name);
    this.Name = school.name;
    if (school.departments.length > 0) {
      for (const department of school.departments) {
        Departments.push(
          new FormGroup({
            'id' : new FormControl(department.id, Validators.required),
            'name': new FormControl(department.name, Validators.required)
          })
        );
      }
    }
    this.schoolForm = new FormGroup({
      'name' : new FormControl(this.Name, Validators.required),
      'departments': Departments
    });
  }

  onCancel() {
    this.router.navigate(['../../'], { relativeTo: this.activeRoute } );
  }

  onAddDepartment() {
    (<FormArray>this.schoolForm.get('departments')).push(new FormGroup({
      'name': new FormControl(null, Validators.required)
    }));
  }

  onDepartmentDelete(i) {
    (<FormArray>this.schoolForm.get('departments')).removeAt(i);
  }

  onSubmit() {
    this.universityService.updateSchool(this.schoolId, this.schoolForm.value);
    this.onCancel();
  }

}
