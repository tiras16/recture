import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lecturers } from '../models/Lecturers';

@Injectable({ providedIn: 'root' })


export class CoursesService {
    private baseUrl = 'http://3.10.154.164';
    constructor(private http: HttpClient) { }

    postLecturers(lecturers: Lecturers) {
        return this.http.post(`${this.baseUrl}/courses`, lecturers);
    }
    
    getCategories() {
        return this.http.get(`${this.baseUrl}/courses/category`);
    }
  

}

