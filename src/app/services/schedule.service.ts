import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { studentSchedule, teacherLectureSchedule } from '../models/Schedule';

@Injectable({ providedIn: 'root' })
export class ScheduleService {
    private baseUrl = 'http://3.10.154.164';
    constructor(private http: HttpClient) { }


    getAllPersonalEvents(id: Number){ //tum ogrencıye aıt kişisel tablolar
        return this.http.get<any[]>(`${this.baseUrl}/users/schedule/personal/${id}`);
    }

    getAllLectureEvents(id : Number){ //tüm öğrenciye ait lecture bilgileri
        return this.http.get<teacherLectureSchedule[]>(`${this.baseUrl}/users/schedule/instructor/${id}`);
    }

    getAllHomeLectures(){
        return this.http.get<teacherLectureSchedule[]>(`${this.baseUrl}/homepageL`);
    }


    getAllEnrolledCourse(id: Number){
        return this.http.get<any[]>(`${this.baseUrl}/enrolledLecture/${id}`);
    }

    postPersonalEvent(id: Number, event: any){ //öğrenci kendine ders ekliyor
        return this.http.post(`${this.baseUrl}/users/schedule/personal/${id}`, {data: event});
    }

    postLectureEvent(id: Number, event: any){ // öğrenci derse yazılmak isterse
        return this.http.post(`${this.baseUrl}/users/schedule/instructor/${id}`, {data: event});
    }

    postEnrollCourse(id: Number, event: any){ // öğrenci derse yazılmak isterse
        return this.http.post(`${this.baseUrl}/enroll/${id}`, {lectureId: event});
    }

    deletePersonalEvent(id: Number, event: any){ //öğrenci kendi dersini silmek isterse
        return this.http.post(`${this.baseUrl}/student/delete/personal/${id}`, {lectureId: event});
    }

    deleteEnrolledCourse(id: Number, event: any){
        return this.http.post(`${this.baseUrl}/student/delete/lecture/${id}`, {lectureId: event});
    }

    deleteInsructorOwnCourse(id: Number, event: any){
        return this.http.post(`${this.baseUrl}/instructor/delete/lecture/${id}`, {lectureId: event});
    }

}
