import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from './models/User';
import { AuthenticationService } from './services/authentication.service';
import {ConfirmationService, MessageService} from 'primeng/api';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Recture';
  user : User;
  constructor(private route: ActivatedRoute , private auth: AuthenticationService, private confirmationService: ConfirmationService,private messageService: MessageService,private router: Router){
  }

  display: boolean = false;
  deleteDisplay: boolean = false;

  ngOnInit(){
    this.user = this.auth.currentUserValue;
  }

    showDialog() {
        this.display = true;
    }
    signOut(){
      this.auth.logout();
    }

    deleteAccount(){
      this.deleteDisplay = true;

      this.confirmationService.confirm({
        message: 'Do you want to delete your account?',
        header: 'Delete Confirmation',
        icon: 'pi pi-info-circle',
        accept: () => {
            this.messageService.add({severity:'info', summary:'Confirmed', detail:'Record deleted'});
            this.auth.delete(this.user.idUser).subscribe(item => {
            this.auth.logout();
            this.router.navigate(['/']).then(() => {
            window.location.reload();
            });
            });


        },
        reject: () => {

        }
    });



    }


}
