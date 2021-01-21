import { Component, OnInit, Input,Output,EventEmitter,forwardRef,ViewChild, OnDestroy, ChangeDetectionStrategy, ViewEncapsulation,TemplateRef, ChangeDetectorRef} from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi,EventInput } from '@fullcalendar/angular';
import { NgImageSliderComponent } from 'ng-image-slider';
import { User } from 'src/app/models/User';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Lecturers } from 'src/app/models/Lecturers';
import { LecturerProfileService } from 'src/app/services/lecturerprofile.service';
import { LecturersService } from 'src/app/services/lecturers.service';
import { ScheduleService } from 'src/app/services/schedule.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FullCalendarComponent } from "@fullcalendar/angular";
import { teacherLectureSchedule } from 'src/app/models/Schedule';
import { StarRatingComponent } from 'ng-starrating';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-profile',
  templateUrl: './lecturerprofile.component.html',
  styleUrls: ['./lecturerprofile.component.scss']
})
export class LecturerProfileComponent implements OnInit, OnDestroy {

    @ViewChild('fullcalendar')
    calendarrComponent: FullCalendarComponent;

    @ViewChild('nav') slider: NgImageSliderComponent;
    user : User = new User();
    id: number;
    private sub: any;
    val: number = 5;
    submitted = false;
    lecturers : Lecturers = new Lecturers();
    imageObject: any;
    addVideo:boolean= false;
    currentRate = 0;
    videos;
    safeSrc: SafeResourceUrl;
    display: boolean = false;

    eventName: any;
    currentEvents: any = [];
    calendarEvents: EventInput[] = [];
    initialized = false;
    lectureEvents: teacherLectureSchedule[];
    creditPurchase: boolean = false;
    eventStartDate : String;
    eventEndDate : String;
    deletedEvent :any;
    eventDisplay : boolean = true;
    eventShowDisplay:boolean = false;
    clickedAddEvent: boolean = false;
    submitButonEvent: boolean = false;
    clickCalendar: boolean = false;
    imageSlidePopUp : boolean = true;
    calendarApi ;
    calendarVisible: boolean;
    calendarOptions: CalendarOptions;
    imagePopUp : boolean = false;
    click : boolean;
    lecturer: Lecturers[];
    eventGuid: any = 1;
    editEvent: EventClickArg;
    tempArray: any;
    userId: any;
    showEvent: any = {
      name:null,
      startDate:null,
      isOwn:false,
      startTime:null,
      attentNumber:0,
      zoom:""
    };

    courses:any;

    enrolledLecture : any[] ;
    registerForm: FormGroup = this.formBuilder.group({
      eventName: ['', Validators.required],
      link: ['', Validators.required],
      startTime: ['', Validators.required],
    });

    controlEnrolledBefore: boolean = false;

    constructor(private auth: AuthenticationService,private router: Router, private route: ActivatedRoute,
      private LecturerProfileService : LecturerProfileService,private LecturersService : LecturersService,
      private scheduleService: ScheduleService,
      private formBuilder: FormBuilder,
      private ref: ChangeDetectorRef,
      private sanitizer: DomSanitizer
      ) {

      this.user = this.auth.currentUserValue;
      this.click = true;

      this.sub = this.route.params.subscribe(params => {
        this.id = +params['id']; // (+) converts string 'id' to a number /lecturerprofile/5


      });

      this.scheduleService.getAllLectureEvents(this.id).subscribe(i => this.lectureEvents = i)


      setTimeout(() => {

        this.ref.detectChanges();

          this.lectureEvents.map(item=> {
                item = {
                  ...item,
                  id: item.id,
                  eventId:item.eventId,
                  instructorName: this.user.firstName +" "+  this.user.lastName,
                  title:item.title ,
                  start:new Date(item.start).toISOString().replace(/T.*$/, ''),
                  end:new Date(item.start).toISOString().replace(/T.*$/, ''),
                  time:item.time,
                  eventLink:item.eventLink,
                  attendStudent: item.attendStudent,
                  isOwn : true,
                  allDay : true
                }

                this.currentEvents.push(item)
            })
            this.tempArray= this.currentEvents.map(x => Object.assign({}, x));
            this.loadEvents();
      }, 300);


      this.LecturerProfileService.postLecturers(this.id).subscribe
      (item => {
            this.lecturer=item;
            this.videos = item[1];
            this.safeSrc =  this.sanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/P-tE_W3jpF4?list=RDP-tE_W3jpF4");


       });

      if(this.user && this.user.userType === 'non-premium'){
        this.imagePopUp = true;
        this.eventDisplay = false;
        this.imageSlidePopUp = false;
      }

      if(this.user.idUser === this.id)
      {
        this.clickCalendar = true;
      }
      if(this.user && this.user.userType === 'premium'){
        this.scheduleService.getAllEnrolledCourse(this.user.idUser).subscribe(it => this.enrolledLecture = it)
      }

  }

  ngOnInit() {



      setTimeout(() => {
        for (let i = 0; i < this.videos.length ; i++) {
          this.videos[i].videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.videos[i].videoUrl);
        }
      },600)




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
      selectable: this.clickCalendar,
      selectMirror: true,
      dayMaxEvents: true,
      select: this.handleDateSelect.bind(this),
      eventClick: this.user && (this.user.userType === 'premium' || this.user.userType === 'instructor') ? this.handleEventClick.bind(this) : false,
      eventsSet: this.handleEvents.bind(this)
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    };




  }
  rating(rate,userid){
    this.currentRate = rate;
    this.LecturerProfileService.postScore(rate,userid).subscribe
      (item => {
            location.reload();
       });
  }

  deleteVideo(video) {

    this.LecturerProfileService.postVideoId(video).subscribe(
      item => {
        location.reload();
      }
    );
  }

  ngAfterViewInit() {
    //laoding events based on calendarApi
    this.calendarApi = this.calendarrComponent.getApi();
    if (this.calendarApi && !this.initialized) {
      this.initialized = true;
      this.loadEvents();
    }



  }
  //used to load the events of the calendar
  loadEvents() {
    //to store events in the calendar
    this.calendarEvents =  this.currentEvents

    this.calendarApi.removeAllEventSources(); //obligatory
    this.calendarApi.addEventSource(this.calendarEvents); //obligatory
  }

  get f_register() { return this.registerForm.controls; }

  ngOnDestroy() {
    this.sub.unsubscribe();
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
    this.clickedAddEvent = true;
    this.calendarApi = selectInfo.view.calendar;
    this.eventStartDate = selectInfo.startStr;
    this.eventEndDate = selectInfo.endStr;

}
onAddedInstructorLecture(){
  this.submitButonEvent = true;
  let title = this.eventName
  if (this.f_register?.eventName?.value ) {


  //eklenecek data burada yapılıyor
  let data = {
    id:  this.createEventId(),
    instructor: this.user.firstName +" "+  this.user.lastName,
    name:this.f_register?.eventName?.value ,
    startDate:this.eventStartDate,
    startTime:this.f_register?.startTime?.value,
    zoom:this.f_register?.link?.value
  }

  let LectId;
  this.scheduleService.postLectureEvent(this.user.idUser, data).subscribe(
        item=> {
          LectId = item;
          location.reload()
      })  //add personal event

  setTimeout(() => {
    if(LectId)
    {
      this.tempArray.push({
        id:  LectId,
        instructorName: this.user.firstName +" "+  this.user.lastName,
        title:this.f_register?.eventName?.value ,
        start:this.eventStartDate,
        end:this.eventEndDate,
        isOwn:false,
        allDay: true,
        attendStudent: 0,
        time:this.f_register?.startTime?.value,
        eventLink:this.f_register?.link?.value,
        eventId: LectId
      })

      this.calendarApi.addEvent({
        id:  LectId,
        // instructorName: this.user.firstName + this.user.lastName,
        title:this.f_register?.eventName?.value ,
        start: this.eventStartDate,
        end: this.eventEndDate,
        isOwn:false,
        allDay: true,
        // attendStudent: 0,
        // time:this.f_register?.startTime?.value,
        // eventLink:this.f_register?.link?.value,
        // eventId:0,
      });
      this.eventName = null;
      this.calendarApi.unselect(); // clear date selection
      this.clickedAddEvent=false;
      this.registerForm.reset();
    }

  }, 300);

  }
}

  handleEventClick(clickInfo: EventClickArg) {
    this.editEvent = clickInfo;
    let element = this.tempArray.filter(item => Number(item.eventId)=== Number(this.editEvent.event.id))[0];
    this.showEvent = {
      id: element.id,
      instructorName: element.instructorName,
      title:element.title ,
      start:new Date(element.start).toISOString().replace(/T.*$/, ''),
      isOwn:element.isOwn,
      time:element.time,
      attendStudent:element.attendStudent,
      eventLink:element.eventLink
    };
    this.controlEnrolledBefore = false;
    if(this.enrolledLecture){
      this.enrolledLecture.map(it => {
        if(Number(it) ===  Number(this.editEvent.event.id)){
          this.controlEnrolledBefore = true;
          return;
        }
      })
    }


    this.eventShowDisplay = true;
  }
  onAddedLecture(){
    console.log(this.user.credit)
    if(this.user.credit > 0)
    {
      let idd;
      this.tempArray = this.tempArray.map(item => {
        if(Number(item.eventId)=== Number(this.editEvent.event.id))
        {
          item.attentNumber +=1
          idd = item.eventId;
        }

        return item
      })

      // this.scheduleService.postEnrollCourse(this.user.idUser, idd).subscribe(item=>console.log("hfhjfhjc"))  //add personal event
      this.eventShowDisplay = false;


      // this.auth.getUser(this.user.idUser).subscribe(
      //   item => {
      //     this.user = this.auth.currentUserValue
      //     location.reload()
      //   })
      forkJoin([this.scheduleService.postEnrollCourse(this.user.idUser, idd),  this.auth.getUser(this.user.idUser)]).subscribe(results => {
      // results[0] is our character
      // results[1] is our character homeworld

        location.reload()
    });
    }
    else{
      this.creditPurchase = true
    }

  }


  onDeleteLecture(){
    this.editEvent.event.remove();
    let idd;
   this.tempArray.map(item => {

      if(Number(item.eventId) === Number(this.editEvent.event.id))
        idd = item.eventId;

    })

    this.scheduleService.deleteInsructorOwnCourse(this.user.idUser,idd).subscribe(item=>location.reload())  // delete personal event and lecture event
    this.eventShowDisplay = false;
  }


  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
  }


  // showDialog() {

  //   if(this.user && this.user.userType === 'non-premium'){
  //     this.display = true;
  //   }
  // }
  addvideo() {
    this.addVideo = true;

  }
}
