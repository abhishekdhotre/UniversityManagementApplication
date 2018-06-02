import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {RoleModel} from '../role.model';
import {RoleService} from '../role.service';

@Component({
  selector: 'app-role-edit',
  templateUrl: './role-edit.component.html',
  styleUrls: ['./role-edit.component.scss']
})
export class RoleEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') roleForm: NgForm;
  roleModel: RoleModel;
  subscription: Subscription;
  editedItemId: number;
  editMode = false;

  constructor(private roleService: RoleService) { }

  ngOnInit() {
    this.subscription = this.roleService.startedEditing.subscribe(
      (id: number) => {
        this.editedItemId = id;
        this.editMode = true;
        this.roleModel = this.roleService.getRoleModel(id);
        this.roleForm.setValue({
          name: this.roleModel.name
        });
      }
    );
  }

  onSubmitClick(form: NgForm) {
    const value = form.value;
    const newRole = new RoleModel(value.name);
    if (this.editMode) {
      newRole.id = this.editedItemId;
      this.roleService.updateRole(this.editedItemId, newRole);
    } else {
      this.roleService.addRole(newRole);
    }
    this.editMode = false;
    form.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClear() {
    this.roleForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.roleService.deleteRole(this.editedItemId);
    this.onClear();
  }

}
