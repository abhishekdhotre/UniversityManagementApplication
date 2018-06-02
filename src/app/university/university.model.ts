import {SchoolModel} from './school.model';

export class UniversityModel {
  public id: number;
  public name: string;
  public description: string;
  public imagePath: string;
  public schools: SchoolModel[];

  constructor(id: number, name: string, description: string, imagePath: string, schools: SchoolModel[]) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.schools = schools;
  }
}
