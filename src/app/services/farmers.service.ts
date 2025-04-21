import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FarmersService {
  constructor(private http: HttpClient) {}
  // private baseUrl = 'http://127.0.0.1:5001';
  // private baseUrl = 'http://172.18.0.3:5001';
  private baseUrl = 'https://13.48.195.231:443';
  createFarmer(farmerData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const headers = new HttpHeaders({
        // 'Content-Type': 'application/json',
        'Authorization': `${token}`,
        'role':`${role}` // Or your specific auth scheme
      });
    return this.http.post(`${this.baseUrl}/farmer/create_farmer`, farmerData, { headers });
  }

  getAllFarmers() {
    return this.http.get<any>(`${this.baseUrl}/farmer/get_all_farmers`);
  }

  getFarmersByCrop(){  
    return this.http.get<any>(`${this.baseUrl}/farmer/get_farmers_growing_crop`);}
  }