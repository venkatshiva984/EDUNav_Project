import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EduNavigatorService {

  private apiUrl = 'http://172.162.12.12:4321/recommend_college';

  constructor(private http: HttpClient) { }

  getRecommendations(prompt: string): Observable<any> {
    const body = {
      prompt: prompt
    };
    return this.http.post<any>(this.apiUrl, body);
  }
}
