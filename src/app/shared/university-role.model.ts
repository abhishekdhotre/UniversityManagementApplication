export class UniversityRoleModel {
  public universityId: number;
  public roleId: number;

  constructor(universityId: number, roleId: number) {
    this.universityId = universityId;
    this.roleId = roleId;
  }
}
