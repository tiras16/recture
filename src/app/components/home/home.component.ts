import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi, EventInput } from '@fullcalendar/angular';
import { NgImageSliderComponent } from 'ng-image-slider';
import { studentSchedule, teacherLectureSchedule } from 'src/app/models/Schedule';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { FullCalendarComponent } from "@fullcalendar/angular";
import { Lecturers } from 'src/app/models/Lecturers';
import { BestLecturerService } from 'src/app/services/bestlecturer.service';
import { AllVideosService } from 'src/app/services/allvideos.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild("fullcalendar", { static: true })
  calendarComponent: FullCalendarComponent;

  @ViewChild('nav') slider: NgImageSliderComponent;
  user : User = new User();
  val: number = 5;

// tempStudent : studentSchedule[] =
// [{
//   id:0,
//   title: 'Software Engineering Hw',
//   start: new Date(),
//   end: new Date(),
//   backgroundColor: " orange",
//   textColor: "#7d1913",
//   borderColor:"orange",
//   isOwn : true,
//   allDay : true

// }]

// tempLecture : teacherLectureSchedule[] =
// [{
//   id:1,
//   title: 'Math - Derivatives',
//   instructorName: "Mariana Noe",
//   start: new Date('2021-01-08'),
//   time:"15:30",
//   attendStudents:10,
//   eventLink:"http:zomzomzozmozmzozmozmzozmozm",
//   isOwn : false,
//   allDay : true
// }
// ]
  tempArray: any;
  lectureEvents: teacherLectureSchedule[];
  personalEvents: studentSchedule[];

  currentEvents: any = [];
  calendarEvents: EventInput[] = [];
  initialized = false;
  calendarVisible: boolean;
  calendarOptions: CalendarOptions;
  imagePopUp : boolean = false;
  eventDisplay : boolean = false;
  eventShowDisplay:boolean = false;
  eventNotPremiumShow:boolean = false;
  eventName: any;
  eventStartDate : string;
  eventEndDate : string;
  deletedEvent :any;
  showEvent: any = {
    name:null,
    start:null,
    isOwn:false,
    time:null,
    attendStudent:0,
    eventLink:""
  };
  calendarApi ;
  eventGuid = 1;
  bestlecturer :any;
  allvideos :any;
  userId;


  constructor( private auth: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private scheduleService: ScheduleService,
    private bestLecturerService : BestLecturerService,
    private alllVideosService : AllVideosService,) {

    this.user = this.auth.currentUserValue;
    console.log(this.user)

    if(this.user && this.user.userType === 'premium'){
      this.imagePopUp = true;
      this.scheduleService.getAllPersonalEvents(this.user.idUser).subscribe(
        item =>
        {
          if(item){
            this.personalEvents = item[1],
            this.lectureEvents = item[0]
          }

        }
      );

        setTimeout(() => {

          if(this.personalEvents && this.personalEvents.length > 0)
          {
            this.personalEvents.map(item=> {
                  item = {
                    ...item,
                    id:item.eventId,
                    start: new Date(item.start).toISOString().replace(/T.*$/, ''),
                    end: new Date(item.end).toISOString().replace(/T.*$/, ''),
                    backgroundColor: " orange",
                    textColor: "#7d1913",
                    borderColor:"orange",
                    isOwn : true,
                    allDay : true,
                    eventId: item.eventId
                  }
                  this.currentEvents.push(item)
              })
            }

            if(this.lectureEvents && this.lectureEvents.length > 0)
            {
              this.lectureEvents.map(item=> {
                item = {
                  ...item,
                  id: item.eventId,
                  eventId:item.eventId,
                  instructorName: item.instructorName,
                  instructorSurname: item.instructorSurname,
                  title:item.title ,
                  start:new Date(item.start).toISOString().replace(/T.*$/, ''),
                  end:new Date(item.start).toISOString().replace(/T.*$/, ''),
                  time:item.time,
                  eventLink:item.eventLink,
                  attendStudent: item.attendStudent,
                  isOwn : false,
                  allDay : true
                }
                this.currentEvents.push(item)
            })}
            this.tempArray= this.currentEvents.map(x => Object.assign({}, x));
            this.loadEvents();
      }, 300);

    }
    else{

      this.scheduleService.getAllHomeLectures().subscribe(i => this.lectureEvents = i)
      setTimeout(() => {
          if(this.lectureEvents && this.lectureEvents.length > 0)
          {
            this.lectureEvents.map(item=> {
              item = {
                ...item,
                id: item.eventId,
                eventId:item.eventId,
                instructorName: item.instructorName,
                instructorSurname: item.instructorSurname,
                title:item.title ,
                start:new Date(item.start).toISOString().replace(/T.*$/, ''),
                end:new Date(item.start).toISOString().replace(/T.*$/, ''),
                time:item.time,
                eventLink:item.eventLink,
                attendStudent: item.attendStudent,
                isOwn : false,
                allDay : true
              }
              this.currentEvents.push(item)
          })
            this.tempArray= this.currentEvents.map(x => Object.assign({}, x));
            this.loadEvents();
          }

    }, 300);

    }


    this.bestLecturerService.getBest().subscribe( item => {
      this.bestlecturer = item;
    })

    this.alllVideosService.getAllVideos().subscribe( item => {
      this.allvideos = item;
      console.log(item)
    })

  }
  ngOnInit(): void {
    // this.auth.logout();

    this.calendarVisible = true;
    this.calendarOptions = {
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
      },
      initialView: 'dayGridMonth',
      // initialEvents: this.currentEvents, // alternatively, use the `events` setting to fetch from a feed
      weekends: true,
      editable: true,
      selectable: this.user && this.user.userType === 'premium' ? true : false,
      selectMirror: true,
      dayMaxEvents: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.handleEventClick.bind(this) ,
      eventsSet: this.handleEvents.bind(this)
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    };
  }
  ngAfterViewInit() {
    //laoding events based on calendarApi
    this.calendarApi = this.calendarComponent.getApi();
    if (this.calendarApi && !this.initialized) {
      this.initialized = true;
      this.loadEvents();
    }
  }
  //used to load the events of the calendar
  loadEvents() {
    console.log("takvim")
    //to store events in the calendar
    this.calendarEvents =  this.currentEvents
    this.calendarApi.removeAllEventSources(); //obligatory
    this.calendarApi.addEventSource(this.calendarEvents); //obligatory

  }

  createEventId() {
    return String(this.eventGuid++);
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
      this.eventDisplay = true;
      this.calendarApi = selectInfo.view.calendar;
      this.eventStartDate = selectInfo.startStr;
      this.eventEndDate = selectInfo.endStr;

  }
  onSubmitEvent(){
    let title = this.eventName

    if (this.eventName) {
        let data = {
          eventId: this.createEventId(), //kendı burda Id usretıyor yıne bu sekıl devam ederız
          eventName : title,
          startDate: new Date(this.eventStartDate),
          endDate: new Date(this.eventEndDate),
        }

        let lecId;
        this.scheduleService.postPersonalEvent(this.user.idUser, data).subscribe(item=>lecId = item) //add personal event

      setTimeout(() => {
        if(lecId){
          this.calendarApi.addEvent({
            id: lecId, //kendı burda Id usretıyor yıne bu sekıl devam ederız
            title,
            start: this.eventStartDate,
            end: this.eventEndDate,
            allDay: true,
            isOwn: true,
            backgroundColor:"orange",
            textColor: "#7d1913",
            borderColor:"orange",
            eventId: lecId
          });

          this.tempArray.push({
            id: lecId, //kendı burda Id usretıyor yıne bu sekıl devam ederız
            title,
            start: this.eventStartDate,
            end: this.eventEndDate,
            allDay: true,
            isOwn: true,
            backgroundColor:"orange",
            textColor: "#7d1913",
            borderColor:"orange",
            eventId: lecId
          });

          this.eventName = null;
        }

      }, 300);

    }

    this.calendarApi.unselect(); // clear date selection
    this.eventDisplay=false;

  }
  handleEventClick(clickInfo: EventClickArg) {
    this.deletedEvent = clickInfo;
    let element = this.tempArray.filter( item => Number(item.eventId)=== Number(clickInfo.event.id))[0];
    if(element.isOwn){
      this.showEvent = {
        name:element.title ,
        startDate:new Date(element.start).toISOString().replace(/T.*$/, ''),
        endDate:new Date(element.end).toISOString().replace(/T.*$/, ''),
        isOwn:element.isOwn,
      };
    }
    else{
      this.showEvent = {
        instructorName: element.instructorName,
        instructorSurname: element.instructorSurname,
        title:element.title ,
        start:new Date(element.start).toISOString().replace(/T.*$/, ''),
        isOwn:element.isOwn,
        time:element.time,
        attendStudent:element.attendStudent,
        eventLink:element.eventLink
      };
    }

    if(this.user && this.user.userType === 'premium')
    {
      this.eventShowDisplay = true;
    }
    else
    {
      this.eventNotPremiumShow = true;
    }


  }

  onDeleteEvent(){
    this.deletedEvent.event.remove();
    this.scheduleService.deletePersonalEvent(this.user.idUser, this.deletedEvent.event.id).subscribe(); // delete personal event
    this.eventShowDisplay = false;
  }
  onLeaveLecture(){
    this.deletedEvent.event.remove();
    this.scheduleService.deleteEnrolledCourse(this.user.idUser, this.deletedEvent.event.id).subscribe();  // delete personal event
    this.eventShowDisplay = false;
    this.userId = this.user.idUser
    this.auth.getUser(this.userId).subscribe(
      item => {
        this.user = this.auth.currentUserValue
        location.reload()
      })

  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }

  display: boolean = false;

  application() {
      this.display = true;
    }


}
