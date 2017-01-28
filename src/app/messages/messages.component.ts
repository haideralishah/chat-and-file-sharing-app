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
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  currentUserID: any;
  filesToUpload: Array<File>;
  constructor(public dataService: DataService, private router: Router) {
    this.filesToUpload = [];
    this.currentUserID = this.dataService.userID;
    console.log(this.currentUserID, '  this.currentUserID');
    firebase.database().ref('/messages').on('child_added', (data) => {
      let obj = data.val();
      obj.id = data.key;
      this.messages.push(obj)
      console.log(this.messages, 'this.messages');
      let selectedUser: any = localStorage.getItem('selectedUser')

    })

  }

  messages: any = [];



  ngOnInit() {
  }
  msgBox = '';
  messageObj: any = {};
  sendMessage(message, urlLink) {
    // this.form.reset()
    console.log(message);
    this.msgBox = '';
    this.messageObj.senderId = this.currentUserID;
    let selectedUser: any = localStorage.getItem('selectedUser')
    selectedUser = JSON.parse(selectedUser);
    console.log(selectedUser);
    this.messageObj.receiverId = selectedUser.id;
    this.messageObj.timeStamp = Date.now();
    this.messageObj.message = message;
    this.messageObj.fileUrl = urlLink;
    console.log(this.messageObj, 'this.messageObj');
    // this.messageObj.receiverID =

    let that = this;
    firebase.database().ref('messages/').push(this.messageObj)
      .then((v) => {

        that.messageObj = {};

      })
  }


  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  uploadImage(fileUp) {
    // console.log(fileUp.file);
    console.log(this.filesToUpload[0]);
    if (this.filesToUpload[0]) {
      var storageRef = firebase.storage().ref().child('images/mountains.jpg');
      var file = this.filesToUpload[0];
      let that = this;
      storageRef.put(file).then(function (snapshot) {

        console.log(snapshot.downloadURL, 'snapshot');
        console.log('Uploaded a blob or file!');
        that.sendMessage('', snapshot.downloadURL)




      });
      // let uploadTask = storageRef.put(file);

      // uploadTask.on('state_changed',(snapshot:any)=>{})

    }



  }
}
