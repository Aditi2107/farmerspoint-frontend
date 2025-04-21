import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SchedulesService {
  // private baseUrl = 'http://127.0.0.1:5001';

// private baseUrl = 'http://172.18.0.3:5001';
private baseUrl = 'https://13.48.195.231:443';
  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('token') || '';
    const role = localStorage.getItem('role') || '';
    return new HttpHeaders({
      Authorization: token,
      role: role
    });
  }

  createSchedule(scheduleData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/schedule/create_schedule`, scheduleData, {
      headers: this.getHeaders()
    });
  }

  getAllSchedules(): Observable<any> {
    return this.http.get(`${this.baseUrl}/schedule/get_all_schedules`);
  }

  getSchedulesByFarmId(farmId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/schedule/schedules/farm/${farmId}`);
  }

  getDueSchedulesByFarmId(farmId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/schedule/schedules/due/${farmId}`);
  }

  getBillByFarmerFarm(farmerId: number, farmId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/schedule/schedules/bill/${farmerId}/${farmId}`);
  }
}
