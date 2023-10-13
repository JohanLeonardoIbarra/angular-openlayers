import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../ts/interface/issue.interface';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) { }

  getIssues(page: number = 1): Observable<Issue[]> {
    const url = 'https://api-canary.mejoratuciudad.org/public-api/requests?limit=20&page=' + page;
    return this.http.get<Issue[]>(url)
  }
}
