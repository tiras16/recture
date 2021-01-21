import { Component, OnInit, EventEmitter, Output,} from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Application } from 'src/app/models/Application';
import { ListApplicationService } from 'src/app/services/listapplication.service';
import { User } from 'src/app/models/User';

@Component({
  selector: 'app-listapplication',
  templateUrl: './listapplication.component.html',
  styleUrls: ['./listapplication.component.scss']
})
export class ListApplicationComponent implements OnInit {

  Applications: Application[];
  admin : User;

  constructor(private appService : ListApplicationService, private auth: AuthenticationService,private router: Router, private route: ActivatedRoute) {

    this.admin = this.auth.currentUserValue;

    this.appService.getAll().subscribe( item => {
      this.Applications = item;
    })
  }

  ngOnInit(): void {
  }

  deleteApp(id) {

    this.appService.postAppId(id).subscribe(
      item => {
        location.reload();
      }
    );
  }

  approved(id) {

    this.appService.postApproved(id).subscribe(
      item => {
        location.reload();
      },
      error =>
      {
        location.reload();
      }

    );
  }
}
