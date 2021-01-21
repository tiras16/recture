import { Component, OnInit } from '@angular/core';
import { UploadFilesService } from 'src/app/services/upload-file.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Chat } from 'src/app/models/Chat';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  selectedFile: File = null;
  message = '';


  fileInfos: Observable<any>;
  visibleAltPanel : boolean = false;
  newMessage: string = "";
  viewerImage : boolean = false;
  viewerImageUrl : string = "";


  newUser : any[];
  user : any;
  messages : Chat[];
  error = false;

  constructor(private auth: AuthenticationService, private uploadService: UploadFilesService, private chatService: ChatService) {
    this.user = {
      id: this.auth.currentUserValue.idUser,
      name:this.auth.currentUserValue.firstName + " " + this.auth.currentUserValue.lastName,
      username:this.auth.currentUserValue.username,
      image:this.auth.currentUserValue.ImageUrl,
      userType:this.auth.currentUserValue.userType
    }

    this.chatService.getAllMessage().subscribe(item => this.messages = item);

   }

  ngOnInit(): void {
    // this.uploadService.getUser().subscribe(item => {
    //   console.log("item", item)
    // });


    // this.fileInfos = this.uploadService.getFiles();
  }

  sendMessage(message: string) {
    let messageId;
    console.log(this.selectedFile)
    if(this.selectedFile){

      this.upload(this.selectedFile, message);
    }
    else
    {
      this.error = true
      this.chatService.postAddMessage(
        {
          userId : this.user.id,
          messageId:this.messages.length + 1,
          username: this.user.username,
          userImg: this.user.image,
          message: message,
          image: null,
          date:new Date().toISOString().replace(/T.*$/, ''),
          visible:false
        }
      ).subscribe(item =>{
        messageId = item;
        this.selectedFile = null;
        this.newMessage = ""
        this.error = false;
        this.messages.push({
          userId : this.user.id,
          messageId:messageId,
          username: this.user.username ,
          userImg: this.user.image,
          message: message,
          date:new Date().toISOString().replace(/T.*$/, ''),
          visible:false
        });
        location.reload();
      },
      err => {
        this.error = true;
      }
      )
    }

  }

  messageClick(id : number){
    if(this.messages[id].userId !== this.user.id)
      this.messages[id].visible = !this.messages[id].visible;
  }
  imageClick(url : string){
    this.viewerImage = true;
    this.viewerImageUrl = url;
  }



  selectFiles(event): void {
    this.selectedFile = <File>event.target.files[0];
    // let isImage = true;

    //   if (!file.type.match('image.*')) {
    //     isImage = false;
    //     alert('invalid format!');
    //   }else{
    //     this.selectedFile = file
    //   }

  }

  upload(file, message) {
    let messageId;
    console.log("dhfks", this.selectedFile)
    this.uploadService.upload(file).subscribe(
      event => {
        this.error = false;
      },
      err => {
        this.message = 'Could not upload the file:' + file.name;
        this.error = true;
      });

    setTimeout(() => {

      if(!this.error){
          this.chatService.postAddMessage(
            {
              userId : this.user.id,
              messageId:this.messages.length + 1,
              username: this.user.username,
              userImg: this.user.image,
              message: message,
              image: file.name ,
              date:new Date().toISOString().replace(/T.*$/, ''),
              visible:false
            }
          ).subscribe(item =>{
            messageId = item
            this.error = false;
            this.selectedFile = null;
            this.newMessage = ""
            this.messages.push({
              userId : this.user.id,
              messageId:messageId,
              username: this.user.username ,
              userImg: this.user.image,
              message: message,
              date:new Date().toISOString().replace(/T.*$/, ''),
              visible:false
            });
            location.reload();
          },
          err => {
            this.error = true;
          }
          )

      }

    }, 500);
  }

}
