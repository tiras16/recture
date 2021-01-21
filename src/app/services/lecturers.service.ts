import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lecturers } from '../models/Lecturers';

@Injectable({ providedIn: 'root' })

export class LecturersService {
    private baseUrl = 'http://3.10.154.164';
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Lecturers[]>(this.baseUrl+`/lecturers`);
    }
    getAllCourses(){
        return this.http.get<Lecturers[]>(this.baseUrl+`/courses`);
    } 
    

}
