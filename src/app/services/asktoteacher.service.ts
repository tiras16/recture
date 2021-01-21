import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../models/Question';
import { Answer } from '../models/Answer';

@Injectable({ providedIn: 'root' })

export class AsktoTeacherService {
    private baseUrl = 'http://3.10.154.164';
    constructor(private http: HttpClient) { }


    postAnswer(answer: Answer) {
      return this.http.post(`${this.baseUrl}/replyQuestion`, answer);
    }
    getAll() {
      return this.http.get(`${this.baseUrl}/asktoteachers`);
    }
    postQuestion(question: Question) {
      return this.http.post(`${this.baseUrl}/asktoteachers`, question);
    }


}
