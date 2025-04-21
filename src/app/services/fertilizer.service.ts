import { Injectable } from '@angular/core';

// import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FertilizerService {
    // private baseUrl = 'http://127.0.0.1:5001';
    // private baseUrl = 'http://172.18.0.3:5001';
    private baseUrl = 'https://13.48.195.231:443';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    return new HttpHeaders({
      'Authorization': `${token}`,
      'role': `${role}`
    });
  }


  getAllFertilizers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/fertilizer/fertilizers`);
  }

  getFertilizerByName(fertilizer_name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/fertilizer/fertilizers/${fertilizer_name}`);
  }

  createFertilizer(fertilizer: { fertilizer_name: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/fertilizer/create_fertilizer`, fertilizer,{
        headers: this.getHeaders()
      });
  }

 }
