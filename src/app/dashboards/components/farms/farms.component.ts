
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FarmService } from '../../../services/farm.service';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';

import { ActivatedRoute } from '@angular/router';

import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common'; 


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farms',
  imports: [CommonModule,MatFormFieldModule,MatInputModule,MatTableModule,ReactiveFormsModule,MatDatepickerModule,MatNativeDateModule],
templateUrl: './farms.component.html',
styleUrls: ['./farms.component.css']
})
export class FarmsComponent implements OnInit {
  farms: any[] = [];
  farmForm: FormGroup;
  farmerIdForm: FormGroup;
  showCreateFarmForm = false;
  showbyFarmer =false;
  displayedColumns: string[] = ['id','area', 'village', 'crop_grown', 'country_id', 'farmer_id', 'sowing_date'];
  role = localStorage.getItem('role')?.replace(/[{}]/g, '') || '';

  constructor(private ApiService: ApiService,
    private authService: AuthService,
    private dialog: MatDialog,private fb: FormBuilder, private farmService: FarmService,private route: ActivatedRoute, private router:Router) {
    this.farmForm = this.fb.group({
     
      area: [''],
      village: [''],
      crop_grown: [''],
      country: [''],
      farmer_id: [''],
      sowing_date: ['']
    });

    this.farmerIdForm = this.fb.group({
      farmer_id: ['']
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const farmerId = params['farmerId'];
      if (farmerId) {
        this.farmService.getFarmsByFarmer(farmerId).subscribe({
          next: (res) => {
            this.farms = res.farms || [];
          },
          error: (err) => {
            console.error('Error fetching farms by farmer:', err);
          }
        });
      } else {
        this.getAllFarms(); // or leave blank
      }
    });
  }
  goBack() {
    window.history.back();
  }
  

  goToSchedules(farm: any) {
    this.router.navigate(['schedules'], {
      
      queryParams: { farm_id:farm.id,farmer_id: farm.farmer_id }
    });
  }

  toggleCreateFarmForm(): void {
    this.showCreateFarmForm = !this.showCreateFarmForm;
  }

  togglebyfarmerform(): void {
    this.showbyFarmer = !this.showbyFarmer;
  }

  getAllFarms(): void {
    this.farmService.getAllFarms().subscribe({
      next: (res) => {
        this.farms = res.farms || [];  // Adjust according to actual response structure
      },
      error: (err) => {
        console.error('Error fetching all farms:', err);
      }
    });
  }
  
  onGetFarmsByFarmer(): void {
     this.showbyFarmer=true;
    const farmerId = this.farmerIdForm.value.farmer_id;
    this.farmService.getFarmsByFarmer(farmerId).subscribe({
      next: (res) => {
        this.farms = res.farms || [];
      },
      error: (err) => {
        console.error('Error fetching farms by farmer:', err);
      }
    });
  }
  
  onCreateFarm(): void {
    const farmData = this.farmForm.value;
    this.farmService.createFarm(farmData).subscribe({
      next: (res) => {
        alert("farm created successfully!")
        this.getAllFarms();  // Refresh after creation
        this.farmForm.reset();
        this.showCreateFarmForm = false;
      },
      error: (err) => {
        console.error('Error creating farm:', err);
      }
    });
  }
}
