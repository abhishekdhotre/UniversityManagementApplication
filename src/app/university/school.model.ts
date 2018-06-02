import {DepartmentModel} from './department.model';

export class SchoolModel {
  public id: number;
  public name: string;
  public departments: DepartmentModel[];

  constructor(id: number, name: string, departments: DepartmentModel[]) {
    this.id = id;
    this.name = name;
    this.departments = departments;
  }
}
