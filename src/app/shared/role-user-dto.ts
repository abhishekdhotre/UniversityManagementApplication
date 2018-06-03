export class RoleUserDto {
  public roleName: string;
  public userName: string;

  constructor(roleName: string, userName: string) {
    this.roleName = roleName;
    this.userName = userName;
  }
}
