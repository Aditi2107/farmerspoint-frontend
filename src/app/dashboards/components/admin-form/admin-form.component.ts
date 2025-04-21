
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Component({
  selector: 'app-admin-form',
  templateUrl: './admin-form.component.html',
  styleUrls: ['./admin-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class AdminFormComponent {
  adminForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.adminForm = this.fb.group({
      name: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      password_hash: ['', Validators.required],
    });
  }
  private getHeaders() {
    const token = localStorage.getItem('token') || '';
    const role = localStorage.getItem('role') || '';
    return new HttpHeaders({
      Authorization: token,
      role: role
    });
  }

  onSubmit(): void {
    if (this.adminForm.valid) {
      const formData = this.adminForm.value;

      this.http.post('https://13.48.195.231:443/user/createadmin', formData,{
        headers: this.getHeaders()
      }).subscribe({
        next: (res) => {
          console.log('Admin created successfully:', res);
          alert('Admin registered successfully!');
          this.adminForm.reset();
        },
        error: (err) => {
          console.error('Error creating admin:', err);
          alert('Something went wrong!');
        }
      });
    }
  }
}

