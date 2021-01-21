import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../models/Contact';

@Injectable({ providedIn: 'root' })

export class ListContactService {
    private baseUrl = 'http://3.10.154.164';
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Contact[]>(`${this.baseUrl}/admin/contacts`);
    }

    postContactId(id: number) {
      return this.http.post(`${this.baseUrl}/admin/contact`, id);
    }
}
