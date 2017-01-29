import { Component, OnInit, EventEmitter } from '@angular/core';
import { DataService } from '../data.service';
import {
  RouterModule,
  ActivatedRoute,
  Router,
  Routes
} from '@angular/router';

declare var firebase: any;
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  inputs: ['users'],
  outputs: ["userSelect"]
})
export class ContactsComponent implements OnInit {
  users: any;
  cureentUser: any;
  userSelect: EventEmitter<Object>;
  constructor(public dataService: DataService, private router: Router) {
    this.userSelect = new EventEmitter();
    this.cureentUser = firebase.auth().currentUser.uid;
  }

  ngOnInit() {
  }
  selectedContact


  selectUser(user, userstyle) {
    this.selectedContact = user.userName;
    this.dataService.setSelectedUser(user);

    // console.log(user, userstyle, 'user, userstyleuser, userstyle');



    this.userSelect.emit(user);
  }
}
