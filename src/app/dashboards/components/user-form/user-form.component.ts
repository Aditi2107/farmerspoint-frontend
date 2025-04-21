// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-user-form',
//   imports: [],
//   templateUrl: './user-form.component.html',
//   styleUrl: './user-form.component.css'
// })
// export class UserFormComponent {

// }
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  // standalone: true,
  imports: [CommonModule, ReactiveFormsModule,FormsModule], // we'll update this soon
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(private fb: FormBuilder,private http: HttpClient) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      phonenumber: ['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
      // role: ['user', Validators.required], // default role
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
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      
      this.http.post('https://13.48.195.231:443/user/register', formData,{
        headers: this.getHeaders()
      }).subscribe({
        next: (res) => {
          console.log('User created successfully:', res);
          alert('User registered successfully!');
          this.userForm.reset();
        },
        error: (err) => {
          console.error('Error creating user:', err);
          alert('Something went wrong!');
        }
      });
    }
  }
}