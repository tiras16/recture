import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { ChatComponent } from './components/chat/chat.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { LecturerComponent } from './components/lecturer/lecturer.component';
import { PurchaseComponent } from './components/purchase/purchase.component';
import { CoursesComponent } from './components/courses/courses.component';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import{ LecturerProfileComponent} from './components/lecturerprofile/lecturerprofile.component';
import{ AdminProfileComponent} from './components/adminprofile/adminprofile.component';
import{ ListApplicationComponent} from './components/listapplication/listapplication.component';
import{ ListUserComponent} from './components/listuser/listuser.component';
import{ ListContactComponent} from './components/listcontact/listcontact.component';
import{ AsktoteacherComponent} from './components/asktoteacher/asktoteacher.component';

const routes: Routes = [

  {path: '', component: HomeComponent},
  {path: 'question-panel', component: ChatComponent},
  {path: 'contact', component: ContactComponent},
  {path: '', redirectTo: 'lecturers', pathMatch: 'full' },
  {path: 'lecturers', component: LecturerComponent},
  {path: 'courses', component: CoursesComponent},
  {path: 'auth', component: AuthenticationComponent},
  {path: 'lecturerprofile/:id', component: LecturerProfileComponent},
  {path: 'admin', component: AdminProfileComponent},
  {path: 'admin/applications', component: ListApplicationComponent},
  {path: 'admin/users', component: ListUserComponent},
  {path: 'admin/contacts', component: ListContactComponent},
  {path: 'asktoteacher', component: AsktoteacherComponent},
  { path: '**', component: HomeComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
