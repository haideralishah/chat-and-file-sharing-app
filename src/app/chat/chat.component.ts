import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import {
  RouterModule,
  ActivatedRoute,
  Router,
  Routes
} from '@angular/router';

declare var firebase: any;

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  users: any = [];
  currentUser: any;
  userID: any;
  innerHeight;
  innerWidth;
  allMessages: any = [];
  constructor(public dataService: DataService, private router: Router) {

    this.innerHeight = (window.screen.height) + "px";
    this.innerWidth = (window.screen.width) + "px";
    console.log(innerHeight, 'innerHeight');
    console.log(innerWidth, 'innerWidth');

    firebase.database().ref('/users').on('child_added', (data) => {
      let obj = data.val();
      obj.id = data.key;
      this.users.push(obj)
      console.log(this.users);
    })

    firebase.database().ref('/messages').on('child_added', (data) => {
      let obj = data.val();
      obj.id = data.key;
      this.allMessages.push(obj)
      console.log(this.allMessages);
    })
    this.currentUser = firebase.auth().currentUser;
    this.userID = this.currentUser.uid;
    console.log(this.userID, 'this.userID');
    console.log(this.currentUser, 'this.currentUser');
    console.log(this.users, 'this.users');

  }

  ngOnInit() {
  }
  selectUser(selectedUser) {
    console.log(selectedUser);
    this.dataService.setSelectedUser(selectedUser.id);
    localStorage.setItem('selectedUser', JSON.stringify(selectedUser));
  }

}
