import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Chat } from '../models/Chat';

@Injectable({ providedIn: 'root' })
export class ChatService {
    private baseUrl = 'http://3.10.154.164';
    constructor(private http: HttpClient) { }

    getAllMessage() {
        return this.http.get<Chat[]>(`${this.baseUrl}/panel`);
    }

    postAddMessage(message: Chat){
        return this.http.post(`${this.baseUrl}/panel`, message);
    }

    complaintMessage(id: number) {
        return this.http.post(`${this.baseUrl}/panel/delete`, id);
    }
}
