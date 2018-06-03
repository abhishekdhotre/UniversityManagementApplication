import { Component, OnInit } from '@angular/core';
import {LocalDataSource, Ng2SmartTableModule} from 'ng2-smart-table';
import {RoleService} from '../role.service';
import {Subscription} from 'rxjs';
import {UniversityRoleDtoModel} from '../../shared/university-role-dto.model';

@Component({
  selector: 'app-role-mapping-list',
  templateUrl: './role-mapping-list.component.html',
  styleUrls: ['./role-mapping-list.component.scss']
})
export class RoleMappingListComponent implements OnInit {
  universityRoleModels: UniversityRoleDtoModel[];
  subscription: Subscription;
  source: LocalDataSource = new LocalDataSource();
  settings = {
    actions: false,
    pager: { perPage: 5 },
    columns: {
      universityName: {
        title: 'University Name',
      },
      roleName: {
        title: 'Role Name'
      }
    }
  };
  constructor(private roleService: RoleService) {
    this.subscription = this.roleService.universityRoleMappingUpdated.subscribe(
      (universityRoleModels: UniversityRoleDtoModel[]) => {
        this.universityRoleModels = universityRoleModels;
        this.source.load(this.universityRoleModels);
      }
    );
    this.roleService.getUniversityRolesMapping();
  }

  ngOnInit() {
  }

}
