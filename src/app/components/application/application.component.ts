import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Application } from 'src/app/models/Application';
import { ApplicationService } from 'src/app/services/application.service';
import { UploadFilesService } from 'src/app/services/upload-file.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {
  active: number = 0;
  applicationForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  selectedFiles: FileList;
  fileData: File = null;
  fileDataCV: File = null;
  previewUrl:any = null;
  hide = true;
  application : Application = new Application();
  categories: any;
  errorPhoto: Boolean = false;
  errorCV: Boolean = false


  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private applicationService : ApplicationService,
    private uploadService: UploadFilesService
    ) {

    this.applicationService.getCategories().subscribe( item => {
        this.categories = item;
    })
  }

  ngOnInit() {
    this.applicationForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      description: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      category: ['', [Validators.required]],
      cv: ['',Validators.required]
    });


  }
  get f_application() { return this.applicationForm.controls; }

  selectFiles(event): void {
    this.fileData = <File>event.target.files[0];
    this.preview();
  }

  selectCV(event): void {
    this.fileDataCV = <File>event.target.files[0];
  }

  preview() {
      // Show preview
      var reader = new FileReader();
      reader.readAsDataURL(this.fileData);
      reader.onload = (_event) => {
      this.previewUrl = reader.result;
      }
  }

  onSubmitApplication() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.applicationForm.invalid) {
        return;
    }

    this.application.firstName = this.f_application.firstName.value;
    this.application.lastName = this.f_application.lastName.value;
    this.application.username = this.f_application.username.value;
    this.application.description = this.f_application.description.value;
    this.application.password = this.f_application.password.value;
    this.application.email = this.f_application.email.value;
    this.application.image = this.fileData ? this.fileData.name : null;
    this.application.cv = this.fileDataCV.name;
    this.application.category = this.f_application.category.value;



    // this.uploadService.upload(this.fileData).subscribe(
    //   event => {
    //     this.errorPhoto = false;

    //   },
    //   err => {
    //     this.errorPhoto = true;
    //     console.log("IMGerrrorrr")
    //   });

    //   if(this.errorPhoto == false){
    //     this.uploadService.upload(this.fileDataCV).subscribe( eve => {
    //       this.errorCV = false;
    //       this.loading = true;

    //     },
    //     err => {
    //       this.errorCV = true;
    //       console.log("CVerrrorrr")
    //     });
    //     if(this.errorCV == false){
    //       this.applicationService.postApplication(this.application).subscribe(
    //         item => {
    //           location.reload()
    //       }
    //     );
    //   }
    // }
    this.loading = true;


    forkJoin([this.uploadService.upload(this.fileData),  this.uploadService.upload(this.fileDataCV),this.applicationService.postApplication(this.application)]).subscribe(results => {
      // results[0] is our character
      // results[1] is our character homeworld

        location.reload()
    });






  }
}
