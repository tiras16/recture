import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Addvideo } from '../models/Addvideo';

@Injectable({ providedIn: 'root' })


export class AddVideoService {
    private baseUrl = 'http://3.10.154.164';
    constructor(private http: HttpClient) { }

    postAddvideo(add: Addvideo) {
        return this.http.post<Addvideo[]>(`${this.baseUrl}/addvideo`, add);
    }
    
}
