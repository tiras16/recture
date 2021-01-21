import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Lecturers } from '../models/Lecturers';


@Injectable({ providedIn: 'root' })

export class AllVideosService {
    private baseUrl = 'http://3.10.154.164';
    constructor(private http: HttpClient) { }

    getAllVideos() {
        return this.http.get(`${this.baseUrl}/homevideos`);
    }

}
