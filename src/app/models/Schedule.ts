export class studentSchedule {
   id: Number;
   eventId:Number;
   title: String;
   start: string;
   end: string;
   backgroundColor?:String ;
   textColor?:String ;
   borderColor?: String ;
   isOwn?: boolean;
   allDay?: boolean

}

export class teacherLectureSchedule {
    id: Number;
    eventId:Number;
    title: String;
    start: string;
    end: string;
    instructorName:String;
    instructorSurname:String;
    time : String;
    attendStudent: Number;
    eventLink: String;
    isOwn?: boolean ;
    allDay?: boolean ;
}