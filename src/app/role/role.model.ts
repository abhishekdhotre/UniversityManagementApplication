import {UserModel} from '../user/user.model';

export class RoleModel {
  public id: number;
  public name: string;
  public users: UserModel[];

  constructor(name: string, id?: number, users?: UserModel[]) {
    this.id = id;
    this.name = name;
    this.users = users;
  }
}
