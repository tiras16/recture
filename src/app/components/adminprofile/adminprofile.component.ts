import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-adminprofile',
  templateUrl: './adminprofile.component.html',
  styleUrls: ['./adminprofile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  admin : User;

  constructor( private auth: AuthenticationService) {

    this.admin = this.auth.currentUserValue;

   }

  ngOnInit(): void {
  }


}
