import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../models/Contact';

@Injectable({ providedIn: 'root' })


export class ContactService {
    private baseUrl = 'http://3.10.154.164';
    constructor(private http: HttpClient) { }

    postContact(contact: Contact) {
        return this.http.post(`${this.baseUrl}/contact`, contact);
    }

}
