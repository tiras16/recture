import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/Contact';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  selectedType : any;
  message : Contact = new Contact();

  options = ['Complaint', 'Suggestion', 'Other'];

  constructor(
    private formBuilder: FormBuilder,
    private contactservice : ContactService
  ) {
  }

  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      Name: ['', Validators.required],
      text: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],

    });

  }
  get f_register() { return this.registerForm.controls; }

  onSubmitMessage() {
    this.submitted = true;
    this.loading = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    this.message.messageType= this.selectedType;
    this.message.name = this.f_register.Name.value;
    this.message.message = this.f_register.text.value;
    this.message.email = this.f_register.email.value;

    this.loading = true;
    this.contactservice.postContact(this.message).subscribe(
      item => {
        this.submitted = false;
        this.loading = false;
        this.registerForm.reset();
        console.log(item);
      }
    );

    
   

}
changeDropdown(){
}

}
