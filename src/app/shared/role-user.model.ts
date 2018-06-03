export class RoleUserModel {
  public roleId: number;
  public userId: number;

  constructor(roleId: number, userId: number) {
    this.roleId = roleId;
    this.userId = userId;
  }
}
