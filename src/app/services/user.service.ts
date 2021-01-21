import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../models/User';

@Injectable({ providedIn: 'root' })
export class UserService {
    private baseUrl = 'http://3.10.154.164';
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`/users`);
    }

    register(user: User) {
        return this.http.post(`${this.baseUrl}/sign_up`, user);
    }

    delete(id: number) {
        return this.http.delete(`/users/${id}`);
    }
}
