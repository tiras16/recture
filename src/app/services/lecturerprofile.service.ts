import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lecturers } from '../models/Lecturers';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";


@Injectable({ providedIn: 'root' })

export class LecturerProfileService {
    private baseUrl = 'http://3.10.154.164';
    constructor(private http: HttpClient) { }

    postLecturers(id: number) : Observable<Lecturers[]> {
      return this.http.get(`${this.baseUrl}/lecturers/profile/${id}`).map((response: any) => {
             return response
           });
    }

    postVideoId(video: number) {
      return this.http.post(`${this.baseUrl}/deletevideo`, video);
    }

    postScore(currentRate: number, idUser:number) {
      return this.http.post(`${this.baseUrl}/scoreInstructor`, {currentRate, idUser});
    }



}
