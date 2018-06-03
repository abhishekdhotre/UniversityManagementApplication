import { Component, OnInit } from '@angular/core';
import {Subscription} from 'rxjs';
import {LocalDataSource} from 'ng2-smart-table';
import {UserService} from '../user.service';
import {RoleUserDto} from '../../shared/role-user-dto';

@Component({
  selector: 'app-user-mapping-list',
  templateUrl: './user-mapping-list.component.html',
  styleUrls: ['./user-mapping-list.component.scss']
})
export class UserMappingListComponent implements OnInit {
  roleUserDtos: RoleUserDto[];
  subscription: Subscription;
  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions: false,
    pager: { perPage: 5 },
    columns: {
      roleName: {
        title: 'Role Name',
      },
      userName: {
        title: 'User Name'
      }
    }
  };
  constructor(private userService: UserService) {
    this.subscription = this.userService.roleUserMappingUpdated.subscribe(
      (roleUserDtos: RoleUserDto[]) => {
        this.roleUserDtos = roleUserDtos;
        this.source.load(this.roleUserDtos);
      }
    );
    this.userService.getRoleUsersMapping();
  }

  ngOnInit() {
  }
}
