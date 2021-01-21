import { Component, OnInit, EventEmitter, Output, OnChanges,} from '@angular/core';
import { User } from 'src/app/models/User';
import { Contact } from 'src/app/models/Contact';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ListContactService } from 'src/app/services/listcontact.service';

@Component({
  selector: 'app-listcontact',
  templateUrl: './listcontact.component.html',
  styleUrls: ['./listcontact.component.scss']
})

export class ListContactComponent implements OnInit {

  user : User = new User();
  ContactMessages : Contact[];
  listArray = []
  mType : any;
  admin : User;


  constructor(private contactService : ListContactService, private auth: AuthenticationService,private router: Router, private route: ActivatedRoute) {

    this.admin = this.auth.currentUserValue;

    this.contactService.getAll().subscribe( item => {
      this.ContactMessages = item;
    })

    this.user = this.auth.currentUserValue;


  }

  ngOnInit(): void {

    setTimeout (() => {
      this.listArray = this.ContactMessages
   }, 100);

  }

  onFilter() {
    if(this.mType == 'All')
    {
      this.listArray = this.ContactMessages;
    }
    else
    {
      this.listArray = this.ContactMessages.filter(item=> item.messageType == this.mType);
    }
  }

  deleteContact(id) {

    this.contactService.postContactId(id).subscribe(
      item => {
        location.reload();
      }
    );
  }

}
