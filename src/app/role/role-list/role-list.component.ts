import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {RoleModel} from '../role.model';
import {RoleService} from '../role.service';

@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss']
})

export class RoleListComponent implements OnInit, OnDestroy {
  roles: RoleModel[];
  subscription: Subscription;

  constructor(private roleService: RoleService) { }

  ngOnInit() {
    this.subscription = this.roleService.roleUpdated.subscribe(
      (roles: RoleModel[]) => {
        this.roles = roles;
      }
    );
    this.roleService.getRoles();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditItem(id: number) {
    this.roleService.startedEditing.next(id);
  }

}
