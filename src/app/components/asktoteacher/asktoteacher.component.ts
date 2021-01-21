import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Question } from 'src/app/models/Question';
import { Answer } from 'src/app/models/Answer';
import { AsktoTeacherService } from 'src/app/services/asktoteacher.service';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UploadFilesService } from 'src/app/services/upload-file.service';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-asktoteacher',
  templateUrl: './asktoteacher.component.html',
  styleUrls: ['./asktoteacher.component.scss']
})
export class AsktoteacherComponent implements OnInit {

  questionPhoto = false;
  submitted = false;
  loading = false;
  answerForm: FormGroup;
  questionForm: FormGroup;
  questions;//: Question[];
  answers;//: Answer[];
  question : Question = new Question();
  answer : Answer = new Answer();
  user : User;
  quesId: any;
  categories:any;
  fileData: File = null;
  filterCategory: any;
  questionSrc: any;
  listFilter = []
  error: Boolean = false;

  constructor( private auth: AuthenticationService, private formBuilder: FormBuilder, private AskService : AsktoTeacherService,  private uploadService: UploadFilesService) {

    this.user = this.auth.currentUserValue;

    this.AskService.getAll().subscribe( item => {
      this.questions = item[0];
      this.categories = item[1];
      this.answers = item[2];
    })
  }

  ngOnInit() {

    setTimeout (() => {
      this.listFilter = this.questions;
    },500);

    this.answerForm = this.formBuilder.group({
      answer: ['', Validators.required]
    });

    this.questionForm = this.formBuilder.group({
      question: ['', Validators.required],
      category: ['', Validators.required]
    });

  }
  get f_answer() { return this.answerForm.controls; }
  get f_question() { return this.questionForm.controls; }

  selectImage(event): void {
    this.fileData = <File>event.target.files[0];
    console.log(event.target.files[0])
  }

  answerQuestion(id){
    this.quesId = id;
  }

  openQuestionPhoto(questionImage){
    this.questionSrc = questionImage;
    this.questionPhoto = true;
  }

  onSubmitAnswer() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.answerForm.invalid) {
        return;
    }

    this.answer.answer = this.f_answer.answer.value;
    this.answer.instructorId = this.user.idUser;
    this.answer.questionId = this.quesId;
    this.answer.image = this.fileData ? this.fileData.name : null;
    this.loading = true;

    if(this.fileData){
      this.uploadService.upload(this.fileData).subscribe(
        event => {
          this.error = false
          this.fileData = null
        },
        error => {
          this.error = true
        });

        if(this.error == false){
          setTimeout(()=> {this.AskService.postAnswer(this.answer).subscribe(item => {location.reload()});}, 200)
        }
    }
    else{
      this.AskService.postAnswer(this.answer).subscribe(
        item => {
          location.reload()
        }
      );
    }


    // forkJoin([this.uploadService.upload(this.fileData), this.AskService.postAnswer(this.answer)]).subscribe(results => {
    //   // results[0] is our character
    //   // results[1] is our character homeworld

    //     location.reload()
    // });





    this.loading = false;
    this.submitted = false;
  }

  onSubmitQuestion() {
    this.submitted = true;

    //stop here if form is invalid
    if (this.questionForm.invalid) {
        return;
    }

    this.question.question = this.f_question.question.value;
    this.question.category = this.f_question.category.value;
    this.question.premiumId = this.user.idUser;
    this.question.image = this.fileData ? this.fileData.name : null;
    this.loading = true;

    if(this.fileData){
      this.uploadService.upload(this.fileData).subscribe(
        event => {

          this.error = false;
          this.fileData = null
        },
        error => {
          this.error = true
      });

      if(this.error == false){
        setTimeout(()=> {
          this.AskService.postQuestion(this.question).subscribe(item => {location.reload()});},200)
      }
    }
    else{
      this.AskService.postQuestion(this.question).subscribe(
        item => {
          location.reload()
        }
      );
    }


    // forkJoin([this.uploadService.upload(this.fileData), this.AskService.postQuestion(this.question)]).subscribe(results => {
    //   // results[0] is our character
    //   // results[1] is our character homeworld

    //     location.reload()
    // });

    this.loading = false;
    this.submitted = false;
  }

  onFilter() {

    if(this.filterCategory !== undefined){
      this.listFilter = this.questions.filter(item=> item.category == this.filterCategory);
    }
    else{
      this.listFilter = this.questions;
    }
  }

}
