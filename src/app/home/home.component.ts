import { Component, OnInit } from '@angular/core';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { ConfirmationService, Message } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ ConfirmationService ],
})
export class HomeComponent implements OnInit {

    currentUser: User;
    users: User[] = [];
    msgs: Message[] = [];

    constructor(private userService: UserService,
                private confirmationService: ConfirmationService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }

    private loadAllUsers() {
        this.userService.getAll().subscribe(users => { this.users = users; });
    }

    confirm(id: number) {
        this.confirmationService.confirm({
            message: 'Do you want to delete this user?',
            header: 'Delete Confirmation',
            icon: 'fa fa-trash',
            accept: () => {
                this.deleteUser(id);
                this.msgs = [{severity:'info', summary:'Confirmed', detail:'User deleted'}];
            },
            reject: () => {
                this.msgs = [{severity:'info', summary:'Rejected', detail:'You have rejected'}];
            }
        });
    }

}
