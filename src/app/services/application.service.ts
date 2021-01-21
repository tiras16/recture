import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '../models/Application';

@Injectable({ providedIn: 'root' })


export class ApplicationService {
    private baseUrl = 'http://3.10.154.164';
    constructor(private http: HttpClient) { }

    postApplication(application: Application) {
        return this.http.post(`${this.baseUrl}/application`, application);
    }

    getCategories() {
      return this.http.get(`${this.baseUrl}/application`);
    }




}
