import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';
import {UserService} from '../user.service';
import {UserModel} from '../user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') userForm: NgForm;
  userModel: UserModel;
  subscription: Subscription;
  editedItemId: number;
  editMode = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.userService.startedEditing.subscribe(
      (id: number) => {
        this.editedItemId = id;
        this.editMode = true;
        this.userModel = this.userService.getUserModel(id);
        this.userForm.setValue({
          name: this.userModel.name
        });
      }
    );
  }

  onSubmitClick(form: NgForm) {
    const value = form.value;
    const newUser = new UserModel(value.name);
    if (this.editMode) {
      newUser.id = this.editedItemId;
      this.userService.updateUser(this.editedItemId, newUser);
    } else {
      this.userService.addUser(newUser);
    }
    this.editMode = false;
    form.reset();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onClear() {
    this.userForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.userService.deleteUser(this.editedItemId);
    this.onClear();
  }


}
