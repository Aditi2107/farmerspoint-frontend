import { Component } from '@angular/core';

import { CommonModule } from '@angular/common'; 
// import { UserFormComponent } from '../components/user-form/user-form.component';
import {  FarmersComponent} from '../components/farmers/farmers.component';
import {  FarmsComponent} from '../components/farms/farms.component';
import { FertilizerComponent } from '../components/fertilizers/fertilizers.component';
import { SchedulesComponent } from '../components/schedules/schedules.component';
import { Router } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-user-dashboard',
  standalone: true, 

  imports: [CommonModule,FarmersComponent,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatTableModule,FarmsComponent,FertilizerComponent,SchedulesComponent ], 

  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  selectedView: string = 'overview';
  constructor(private router: Router) {}
  logout(): void {
    localStorage.clear(); 
    this.router.navigate(['']);
  }
  selectView(view: string) {
    this.selectedView = view;
  }
}
