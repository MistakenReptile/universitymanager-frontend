import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { University } from './university';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  private apiServerUrl=environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  public getUniversities(): Observable<University[]>{
    return this.http.get<University[]>(`${this.apiServerUrl}/university/all`)
  }

  public addUniversity(university:University): Observable<University>{
    return this.http.post<University>(`${this.apiServerUrl}/university/add`,university)
  }

  public updateUniversity(university:University): Observable<University>{
    return this.http.put<University>(`${this.apiServerUrl}/university/update`,university)
  }

  public deleteUniversity(universityId:number): Observable<void>{
    return this.http.delete<void>(`${this.apiServerUrl}/university/delete/${universityId}`)
  }
}
