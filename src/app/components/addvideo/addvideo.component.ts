import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Addvideo } from 'src/app/models/Addvideo';
import { AddVideoService } from 'src/app/services/addvideo.service';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
    selector: 'app-addvideo',
    templateUrl: './addvideo.component.html',
    styleUrls: ['./addvideo.component.scss']
  })
  
  export class AddvideoComponent implements OnInit {
    active: number = 0;
    addForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    selectedFiles: FileList;
    fileData: File = null;
    fileDataCV: File = null;
    previewUrl:any = null;
    hide = true;
    add : Addvideo = new Addvideo();
    user : User = new User();
    id: number;
  
    constructor(
      private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private addvideoService : AddVideoService,
      private auth: AuthenticationService,) 
    {
      
      
    }
  
    ngOnInit() {
      this.addForm = this.formBuilder.group({
        title: ['', Validators.required],
        description: ['', Validators.required],
        videoUrl: ['', Validators.required],

      });
      
    }
    get f_add() { return this.addForm.controls; }
  
    selectCV(event): void {
        this.fileDataCV = <File>event.target.files[0];
    }
    onSubmitAdd() {
      this.submitted = true;
      this.user = this.auth.currentUserValue;
      // stop here if form is invalid
     
      this.add.instructorId =this.user.idUser;
      this.add.title = this.f_add.title.value;
      this.add.description = this.f_add.description.value;
      this.add.videoUrl = this.f_add.videoUrl.value;
  
      this.loading = true;
      this.addvideoService.postAddvideo(this.add).subscribe(
        item => {
          location.reload()
        }
      );
      this.loading = false;
    }

  }