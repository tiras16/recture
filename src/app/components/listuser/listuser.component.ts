import { Component, OnInit, EventEmitter, Output,} from '@angular/core';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ListUserService } from 'src/app/services/listuser.service';

@Component({
  selector: 'app-listuser',
  templateUrl: './listuser.component.html',
  styleUrls: ['./listuser.component.scss']
})
export class ListUserComponent implements OnInit {

  Users : User[];
  listArray = []
  uType : any;
  admin : User;

  constructor(private userService : ListUserService, private auth: AuthenticationService, private router: Router, private route: ActivatedRoute,) {

    this.admin = this.auth.currentUserValue;

    this.userService.getAll().subscribe(
      item => {
        this.Users = item;
    })

   }

  ngOnInit(): void {
    setTimeout (() => {
      this.listArray = this.Users
   },100);
  }

  onFilter() {
    if(this.uType == 'All')
    {
      this.listArray = this.Users
    }
    else
    {
      this.listArray = this.Users.filter(item=> item.userType == this.uType);
    }
  }

  banned(id) {

    this.userService.postUserId(id).subscribe(
      item => {
        location.reload();
      }
    );
  }
}
