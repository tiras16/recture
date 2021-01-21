import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '../models/Application';

@Injectable({ providedIn: 'root' })

export class ListApplicationService {
    private baseUrl = 'http://3.10.154.164';
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Application[]>(`${this.baseUrl}/admin/applications`);
    }

    postAppId(id: number) {
      return this.http.post(`${this.baseUrl}/admin/applicationid`, id);
    }

    postApproved(id: number) {
      return this.http.post(`${this.baseUrl}/admin/approved`, id);
    }

}
