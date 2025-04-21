import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { UserFormComponent } from '../components/user-form/user-form.component';
import {  FarmersComponent} from '../components/farmers/farmers.component';
import {  FarmsComponent} from '../components/farms/farms.component';
import { FertilizerComponent } from '../components/fertilizers/fertilizers.component';
import { SchedulesComponent } from '../components/schedules/schedules.component';
import { AdminFormComponent } from '../components/admin-form/admin-form.component';
import { SuperFormComponent } from '../components/super-form/super-form.component';
import { Router } from '@angular/router';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

@Component({
  selector: 'app-superuser-dashboard',
  standalone: true, 
  imports: [CommonModule,UserFormComponent,FarmersComponent,ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatTableModule,FarmsComponent,FertilizerComponent,SchedulesComponent ,AdminFormComponent,SuperFormComponent], 

  templateUrl: './superuser-dashboard.component.html',
  styleUrl: './superuser-dashboard.component.css'
})
export class SuperuserDashboardComponent {
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
