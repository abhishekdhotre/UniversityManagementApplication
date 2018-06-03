import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {UserService} from '../user.service';
import {UserModel} from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: UserModel[];
  subscription: Subscription;
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.subscription = this.userService.userUpdated.subscribe(
      (users: UserModel[]) => {
        this.users = users;
      }
    );
    this.userService.getUsers();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onEditItem(id: number) {
    this.userService.startedEditing.next(id);
  }

}
