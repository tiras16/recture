import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/User';
import { MessageService } from 'primeng/api';
import { ScheduleService } from 'src/app/services/schedule.service';
import { UploadFilesService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  providers: [MessageService]
})
export class AuthenticationComponent implements OnInit {
  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
});
  registerForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
});
  forgotPassword: FormGroup = this.formBuilder.group({
    code: ['', Validators.required],
    password: ['', [Validators.required, Validators.minLength(6)]]
});
    sendEmail: FormGroup = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });

  loadingLogin = false;
  loadingRegister = false;
  loadingForgot= false;
  loadingEmail= false;
  submittedLogin = false;
  submittedRegister = false;
  submittedForgot = false;
  submittedEmail= false;
  returnUrl: string;
  fileData: File = null;
  previewUrl:any = null;
  user: User = new User();
  registerOk: boolean = false;
  loginOk:boolean = false;
  forgotOk:boolean = false;
  isHidden: boolean = true;
  showContent: boolean = true;
  userEmail: any;

  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private messageService: MessageService,
      private uploadService: UploadFilesService

  ) {
      if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
      }
  }

  ngOnInit() {
  }

  // convenience getter for easy access to form fields
  get f_login() { return this.loginForm.controls; }
  get f_register() { return this.registerForm.controls; }
  get f_forgot() { return this.forgotPassword.controls; }
  get f_mail() { return this.sendEmail.controls; }

    onSubmitRegister() {
        this.f_login.username.setValue("");
        this.f_login.password.setValue("");

        this.submittedRegister = true;
        this.loadingRegister = true;
        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }

        this.user = this.registerForm.value;
        this.user.ImageUrl = this.fileData ? this.fileData.name : null;

        if(this.fileData)
        {
            this.uploadService.upload(this.fileData).subscribe(
              event => {

                this.userService.register(this.user)
                    .pipe(first())
                    .subscribe(
                        data => {

                            if(data && data["error"])
                            {
                                this.messageService.add({key: 'tc', severity:'error', summary: 'Error', detail: 'Could not registered, please try again!'});
                                this.registerOk = false;
                                this.loadingRegister = false;

                            }
                            else
                            {
                                this.messageService.add({key: 'tc', severity:'success', summary: 'Success', detail: 'Successfully registered!'});
                                this.registerOk = true;
                                this.loadingRegister = false;

                                setTimeout (() => {
                                    location.reload();
                                }, 200);
                            }

                        },
                        error => {

                        });

              },
              err => {
                console.log("errrorrr")
              });
        }



    }

    onSubmitLogin() {
        this.f_register.firstName.setValue("");
        this.f_register.lastName.setValue("");
        this.f_register.username.setValue("");
        this.f_register.password.setValue("");
        this.f_register.email.setValue("");
        this.submittedLogin = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.loadingLogin = true;
        this.authenticationService.login(this.f_login.username.value, this.f_login.password.value)
            .pipe(first())
            .subscribe(
                data => {
                    if(data && data["error"])
                    {
                        this.messageService.add({key: 'tc', severity:'error', summary: 'Error', detail: 'Invalid information!'});
                        this.loadingLogin = false;
                    }
                    else{
                        this.messageService.add({key: 'tc', severity:'success', summary: 'Success', detail: 'Successfully login!'});
                        this.loginOk = true;
                        this.loadingLogin = false;

                        setTimeout (() => {
                          console.log(data)
                          location.reload();
                          this.router.navigate['/']
                      }, 200);
                    }

                },
                error => {
                    this.loginOk = false;
                    this.loadingLogin = false;
                });
    }

    onSubmitPassword() {

      this.submittedForgot = true;

      if (this.forgotPassword.invalid) {
          return;
      }
      this.loadingForgot = true;
      this.authenticationService.forgot(this.f_forgot.code.value, this.f_forgot.password.value, this.userEmail)
          .pipe(first())
          .subscribe(
              data => {
                  if(data && data["error"])
                  {
                      this.messageService.add({key: 'tc', severity:'error', summary: 'Error', detail: 'Invalid information!'});
                      this.loadingForgot = false;
                  }
                  else{
                      this.messageService.add({key: 'tc', severity:'success', summary: 'Success', detail: 'Successfully changed!'});
                      this.forgotOk = true;
                      this.loadingForgot = false;

                      setTimeout (() => {
                        location.reload();
                    }, 300);
                  }

              },
              error => {
                  this.forgotOk = false;
                  this.loadingForgot = false;
              });
  }


    selectFiles(event): void {
        this.fileData = <File>event.target.files[0];
        this.preview();
    }


    preview() {
        // Show preview
        var mimeType = this.fileData.type;
        if (mimeType.match(/image\/*/) == null) {
        return;
        }

        var reader = new FileReader();
        reader.readAsDataURL(this.fileData);
        reader.onload = (_event) => {
        this.previewUrl = reader.result;
        }
     }
     changeInput(input: any): any {
      input.type = input.type === 'password' ? 'text' : 'password';
    }


    forgot(){

        this.isHidden = !this.isHidden;
        this.showContent = true;

        // this.authenticationService.postForgotId(id).subscribe(
        //   item => {
        //     location.reload();
        //   }
        // );
    }
    onSubmitEmail(){
      this.submittedEmail = true;

      if (this.sendEmail.invalid) {
        return;
      }

      this.showContent = !this.showContent;
      this.isHidden = !this.isHidden;
      this.loadingEmail = true;
      this.userEmail = this.f_mail.email.value;
      this.authenticationService.postEmail(this.f_mail.email.value).subscribe(
            item => {
            }
          );
        this.loadingEmail = false;
      }


}
