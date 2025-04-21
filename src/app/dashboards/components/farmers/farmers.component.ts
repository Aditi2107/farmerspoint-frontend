// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-farmers',
//   imports: [],
//   templateUrl: './farmers.component.html',
//   styleUrl: './farmers.component.css'
// })
// export class FarmersComponent {


// }

import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common'; 
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FarmersService } from '../../../services/farmers.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-farmers',
  templateUrl: './farmers.component.html',
  standalone:true,
  imports: [CommonModule,MatFormFieldModule,MatInputModule,MatTableModule,ReactiveFormsModule],
  
  styleUrls: ['./farmers.component.css']
})
export class FarmersComponent implements OnInit {
  showForm = false; 
  farmerForm: FormGroup; 
  displayedColumns: string[] = ['id','name', 'phonenumber', 'language','country_id'];
  farmers: any ;
  loading: boolean = false;
  error: string = '';

  constructor(
    private ApiService: ApiService,
    private authService: AuthService,
    private dialog: MatDialog,private fb: FormBuilder, private farmerService: FarmersService, private router:Router
  ) {
    this.farmerForm = this.fb.group({
      name: ['', Validators.required],
      phonenumber: ['', Validators.required],
      language: ['', Validators.required],
      country: ['', Validators.required],
    });

    // this.getAllFarmers();
  }

  ngOnInit(): void {
    this.getAllFarmers();
  }

  goToFarms(farmerId: number): void {
    this.router.navigate(['farms'], {
      queryParams: { farmerId }
    });
  }

  getAllFarmers() {
    this.farmerService.getAllFarmers().subscribe({
      next: (res) => {
        console.log("Farmers fetched:", res);
        console.log("Type:", typeof res);
console.log("Is Array?", Array.isArray(res));
        this.farmers = res.farmers|| [];
      },
      error: (err) => {
        console.error("Error fetching farmers:", err);
      }
    });
  }

  // onCreateFarmer(): void {
  //   const dialogRef = this.dialog.open(CreateFarmerDialogComponent, {
  //     width: '500px',
  //     disableClose: true
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result === 'refresh') {
  //       this.getAllFarmers(); // Refresh list after new farmer created
  //     }
  //   });
  // }
  onCreateFarmer(): void {
    if (this.farmerForm.valid) {
      const newFarmer = this.farmerForm.value;
  
      this.farmerService.createFarmer(newFarmer).subscribe({
        next: (response) => {
          alert("Farmer created successfully!")
          console.log('Farmer created:', response);
          this.farmerForm.reset(); // optional
          this.getAllFarmers(); // refresh the list
        },
        error: (error) => {
          console.error('Error creating farmer:', error);
        }
      });
    } else {
      console.warn('Form is invalid');
    }
  }
  getFarmersByCrop(): void {
    this.farmerService.getFarmersByCrop().subscribe({
      next: (res) => {
        this.farmers = res.farmers ; // Adjust based on your backend format
      },
      error: (err) => {
        console.error('Failed to fetch farmers by crop:', err);
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


