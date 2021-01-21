import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NbThemeModule,NbChatModule} from '@nebular/theme';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import { HomeComponent } from './components/home/home.component';
import { ChatComponent } from './components/chat/chat.component';
import { LecturerComponent } from './components/lecturer/lecturer.component';
import { CoursesComponent } from './components/courses/courses.component';
import { ContactComponent } from './components/contact/contact.component';
import {MatIconModule} from '@angular/material/icon';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import {MatMenuModule} from '@angular/material/menu';

// import {CardModule} from 'primeng/card';
// import {ButtonModule} from 'primeng/button';

// import {CardModule} from 'primeng/card';
// import {ButtonModule} from 'primeng/button';


import {MatCardModule} from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { PurchaseComponent } from './components/purchase/purchase.component';
import {DialogModule} from 'primeng/dialog';
import {StepsModule} from 'primeng/steps';
import {DatePipe  } from '@angular/common';
import {RatingModule} from 'primeng/rating';
import {ToastModule} from 'primeng/toast';
import { MatFormFieldModule } from '@angular/material/form-field';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ConfirmDialogModule} from 'primeng/confirmdialog';

import {FileUploadModule} from 'primeng/fileupload';
import {HttpClientModule} from '@angular/common/http';
import { SafePipeModule } from 'safe-pipe';

import {CalendarModule} from 'primeng/calendar';
import { NgxPaymentCardModule } from 'ngx-payment-card';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { FilterPipe } from './filter.pipe';

import{LecturerProfileComponent} from './components/lecturerprofile/lecturerprofile.component';
import { ApplicationComponent } from './components/application/application.component';
import {
  NbButtonModule,
  NbCardModule,
  NbProgressBarModule,
  NbTabsetModule,
  NbUserModule,
  NbIconModule,
  NbSelectModule,
  NbListModule,
  
} from '@nebular/theme';
import { AdminProfileComponent } from './components/adminprofile/adminprofile.component';
import { ListApplicationComponent } from './components/listapplication/listapplication.component';
import { ListUserComponent } from './components/listuser/listuser.component';
import { ListContactComponent } from './components/listcontact/listcontact.component';
import { AsktoteacherComponent } from './components/asktoteacher/asktoteacher.component';
import { AddvideoComponent } from './components/addvideo/addvideo.component';
import {ConfirmationService, MessageService} from 'primeng/api';


FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  timeGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ChatComponent,
    LecturerComponent,
    PurchaseComponent,
    CoursesComponent,
    AuthenticationComponent,
    ContactComponent,
    FilterPipe,
    LecturerProfileComponent,
    ApplicationComponent,
    AdminProfileComponent,
    ListApplicationComponent,
    ListUserComponent,
    ListContactComponent,
    AsktoteacherComponent,
    AddvideoComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StepsModule,
    RatingModule,
    NgImageSliderModule,
    FullCalendarModule,
    MatCardModule,
    MatInputModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    // ButtonModule,
    NbChatModule,
    DialogModule,
    NbThemeModule.forRoot(),
    InputTextareaModule,
    DropdownModule,
    RadioButtonModule,
    CheckboxModule,
    ButtonModule,
    InputTextModule,
    FileUploadModule,
    HttpClientModule,
    SafePipeModule,
    NgxPaymentCardModule,
    CalendarModule,
    MatRadioModule,
    MatIconModule,
    ToastModule,
    NbButtonModule,
    NbCardModule,
    NbProgressBarModule,
    NbTabsetModule,
    NbUserModule,
    NbIconModule,
    NbSelectModule,
    NbListModule,
    MatSelectModule,
    MatMenuModule,
    MatFormFieldModule,
    MatButtonModule,
    MatButtonToggleModule,
    NgbModule,
    ConfirmDialogModule,
    
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}, DatePipe,ConfirmationService,MessageService],
  bootstrap: [AppComponent],

})
export class AppModule { }
