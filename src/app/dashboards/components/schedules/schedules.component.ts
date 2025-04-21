// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-schedules',
//   imports: [],
//   templateUrl: './schedules.component.html',
//   styleUrl: './schedules.component.css'
// })
// export class SchedulesComponent {

// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SchedulesService } from '../../../services/schedule.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';

import { QuantityUnitEnum, QuantityUnitDisplay } from '../quantity-unit.enum'; // adjust the path as needed
@Component({
  selector: 'app-schedules',
  templateUrl: './schedules.component.html',
  standalone: true,
  
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatTableModule, ReactiveFormsModule,MatSelectModule,MatOptionModule,FormsModule],
  styleUrls: ['./schedules.component.css']
})
export class SchedulesComponent implements OnInit {
  quantityUnits = Object.values(QuantityUnitEnum);  
  quantityUnitDisplay = QuantityUnitDisplay;
  showForm = false;
  scheduleForm: FormGroup;
  searchForm: FormGroup;
  dueForm: FormGroup;
  billForm: FormGroup;
  schedules: any[] = [];
  dueschedules: any[] = [];
  displayedColumns: string[] = ['days_after_sowing', 'quantity', 'quantity_unit', 'fertilizer_price', 'fertilizer_id', 'farm_id'];
  showCreateForm = false;
showByFarmForm = false;
showDueByFarmForm = false;
showBillForm = false;
totalBill: number = 0;
farmId: number=0;
farmerId: number=0;


farmIdForSchedules: number=0;
farmIdForDueSchedules: number=0;
farmerIdForBill: number=0;
farmIdForBill: number=0;
  // for search inputs
  // farmId: number = 0;
  
  // billFarmId: number = 0;

  constructor(
    private fb: FormBuilder,
    private schedulesService: SchedulesService,
    private authService: AuthService,private route: ActivatedRoute,
  ) {
    this.scheduleForm = this.fb.group({
      days_after_sowing: ['', Validators.required],
      quantity: ['', Validators.required],
      quantity_unit: ['', Validators.required],
      fertilizer_price: ['', Validators.required],
      fertilizer_id: ['', Validators.required],
      farm_id: ['', Validators.required]
    });
    this.searchForm = this.fb.group({
      farm_id: ['', Validators.required]
    });
    this.dueForm = this.fb.group({
      farm_id: ['', Validators.required]
    });
    this.billForm = this.fb.group({
      farmer_id: ['', Validators.required],
      farm_id: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // this.getAllSchedules();
    

    this.route.queryParams.subscribe(params => {
     const farmerId = params['farmer_id'];
      const farmId = params['farm_id'];
      this.farmId=params['farm_id'];
      // Fetch schedules
      if(farmId)
      {this.schedulesService.getSchedulesByFarmId(farmId).subscribe({
        next: (res) => {
          this.schedules = res.schedules || res;
        },
        error: (err) => {
          console.error('Error fetching schedules:', err);
        }
      });}

      if(farmId)
        {this.schedulesService.getDueSchedulesByFarmId(farmId).subscribe({
          next: (res) => {
            this.dueschedules = res.dueschedules || res;
          },
          error: (err) => {
            console.error('Error fetching schedules:', err);
          }
        });}

      // Fetch total bill
      if (farmerId) {
        this.schedulesService.getBillByFarmerFarm(farmerId, farmId).subscribe({
          next: (res) => {
            this.totalBill = res.total_bill || 0;
          },
          error: (err) => {
            console.error('Error fetching bill:', err);
          }
        });
      }
    });
  }

  goBack() {
    window.history.back();
  }
  

  getAllSchedules(): void {
    this.schedulesService.getAllSchedules().subscribe({
      next: (res) => {
        this.schedules = res.schedules || res;
        console.log('All schedules fetched:', this.schedules);
      },
      error: (err) => {
        console.error('Error fetching schedules:', err);
      }
    });
  }

  getQuantityUnitLabel(unit: string): string {
    return this.quantityUnitDisplay[unit as QuantityUnitEnum] || unit;
  }

  toggleForm(formType: string) {
    this.totalBill = 0;
    this.showCreateForm = formType === 'create' ? !this.showCreateForm : false;
    this.showByFarmForm = formType === 'byFarm' ? !this.showByFarmForm : false;
    this.showDueByFarmForm = formType === 'dueByFarm' ? !this.showDueByFarmForm : false;
    this.showBillForm = formType === 'bill' ? !this.showBillForm : false;
  }
  

  onCreateSchedule(): void {
    if (this.scheduleForm.valid) {
      const newSchedule = this.scheduleForm.value;
      this.schedulesService.createSchedule(newSchedule).subscribe({
        next: (res) => {
          alert('Schedule created successfully!');
          console.log('Schedule created:', res);
          this.showCreateForm = ! this.showCreateForm
          // this.getAllSchedules();
        },
        error: (err) => {
          console.error('Error creating schedule:', err);
        }
      });
    } else {
      console.warn('Schedule form is invalid');
    }
  }

  

  searchSchedulesByFarm(): void {
    const farm_id = this.searchForm.value.farm_id;
    this.schedulesService.getSchedulesByFarmId(farm_id).subscribe({
      next: (res) => {
        this.schedules = res.schedules || res;
        console.log('Schedules by farm:', this.schedules);
      },
      error: (err) => {
        console.error('Error fetching schedules by farm:', err);
      }
    });
  }

  searchDueSchedulesByFarm(): void {
    const farm_id = this.dueForm.value.farm_id;

    this.schedulesService.getDueSchedulesByFarmId(farm_id).subscribe({
      next: (res) => {
        this.schedules = res.schedules || res;
        console.log('Due schedules:', this.schedules);
      },
      error: (err) => {
        console.error('Error fetching due schedules:', err);
      }
    });
  }

  searchBill(): void {
    const farmer_id = this.billForm.value.farmer_id;
    const farm_id = this.billForm.value.farm_id;
    this.schedulesService.getBillByFarmerFarm(farmer_id, farm_id).subscribe({
      next: (res) => {
        this.totalBill = res.total_bill || 0;
        console.log('Bill info:', this.totalBill);
  
      },
      error: (err) => {
 alert("No Bill for this farmer and farm ")
        console.error('Error fetching bill:', err);
      // this.totalBill = 0;
      }
    });
  }

  isAdmin(): boolean {
    return this.authService.getUserRole() === 'admin';
  }

  isSuperuser(): boolean {
    return this.authService.getUserRole() === 'super';
  }
}

