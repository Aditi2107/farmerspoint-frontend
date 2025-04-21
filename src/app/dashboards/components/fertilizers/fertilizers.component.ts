
import { Component ,OnInit} from '@angular/core';
import { FertilizerService } from '../../../services/fertilizer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { MatNativeDateModule } from '@angular/material/core';


import { ApiService } from '../../../services/api.service';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common'; 


import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-fertilizer',
  templateUrl: './fertilizers.component.html',
   imports: [CommonModule,MatFormFieldModule,MatInputModule,MatTableModule,ReactiveFormsModule,MatDatepickerModule,MatNativeDateModule],

  styleUrls: ['./fertilizers.component.css']
})
export class FertilizerComponent implements OnInit {
  fertilizers: any;
  role = localStorage.getItem('role');
  displayedColumns: string[] = ['fertilizer_name'];

  showCreateFertilizerForm: boolean = false;
  showSearchByNameForm: boolean = false;

  fertilizerForm: FormGroup;
  searchForm: FormGroup;

  constructor(private ApiService: ApiService,
   private authService: AuthService,
    private dialog: MatDialog,private fertilizerService: FertilizerService, private fb: FormBuilder)  {
    this.fertilizerForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.searchForm = this.fb.group({
      fertilizer_name: ['', Validators.required]
    });
  }

    ngOnInit() :void{
      this.getAllFertilizers();

    
  }

  getAllFertilizers(): void {
    this.fertilizerService.getAllFertilizers().subscribe({
      next: (res) => {
        this.fertilizers = res|| [];
      },
      error: (err) => {
        console.error('Error fetching fertilizers:', err);
      }
    });
  }

  toggleSearchForm() {
  this.showSearchByNameForm = !this.showSearchByNameForm;
  if (this.showSearchByNameForm) this.showCreateFertilizerForm = false;
}

toggleCreateForm() {
  this.showCreateFertilizerForm = !this.showCreateFertilizerForm;
  if (this.showCreateFertilizerForm) this.showSearchByNameForm = false;
}

  onSearchByName(): void {
    if (this.searchForm.invalid) return;
    this.showSearchByNameForm=true;
    const fertilizer_name = this.searchForm.value.fertilizer_name;
    this.fertilizerService.getFertilizerByName(fertilizer_name).subscribe({
      next: (res) => {
        this.fertilizers = [res] ;
      },
      error: (err) => {
        console.error('Error searching fertilizer:', err);
        this.fertilizers = [];
      }
    });
  }

  onCreateFertilizer(): void {
    if (this.fertilizerForm.invalid) return;

    const name = this.fertilizerForm.value;
    this.fertilizerService.createFertilizer( name ).subscribe({
      next: (res) => {
        alert('Fertilizer created successfully!');
        this.getAllFertilizers(); // Refresh list
        this.fertilizerForm.reset();
        this.showCreateFertilizerForm = false;
      },
      error: (err) => {
        console.error('Error creating fertilizer:', err);
        alert('Failed to create fertilizer');
      }
    });
  }

  isAdminOrSuper(): boolean {
    return this.role === 'admin' || this.role === 'super';
  }
}
