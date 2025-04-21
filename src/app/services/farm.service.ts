import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FarmService {
    // private baseUrl = 'http://127.0.0.1:5001';
    //  private baseUrl = 'http://172.18.0.3:5001';
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

  getAllFarms(): Observable<any> {
    return this.http.get(`${this.baseUrl}/farm/get_all_farms`);
  }

  
  getFarmsByFarmer(farmerId: number): Observable<any> {
    const url = `${this.baseUrl}/farm/farmer/${farmerId}/farms`;
    return this.http.get(url);
  }


  createFarm(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/farm/farm`, data, {
      headers: this.getHeaders()
    });
  }
}
