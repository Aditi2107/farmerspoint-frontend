import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    private baseUrl = 'https://13.48.195.231:443';
    // private baseUrl = 'http://172.18.0.3:5001';
  constructor(private http: HttpClient) {}

  
  getAllFarmers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/farmer/get_all_farmers`);
  }

  createFarmer(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/farmer/create_farmer`, data);
  }

  getFarmersByCrop(crop: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/farmer/get_all_farmers_growing_crop`);
  }

  
  getSchedulesByFarmId(farmId: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/schedule/get_schedules_due_today_or_tomorrow/${farmId}`);
  }

 
}
