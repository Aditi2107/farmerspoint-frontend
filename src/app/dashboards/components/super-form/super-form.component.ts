// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-super-form',
//   imports: [],
//   templateUrl: './super-form.component.html',
//   styleUrl: './super-form.component.css'
// })
// export class SuperFormComponent {

// }
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-super-form',
  templateUrl: './super-form.component.html',
  styleUrls: ['./super-form.component.css'],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
})
export class SuperFormComponent {
  superForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.superForm = this.fb.group({
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
    if (this.superForm.valid) {
      const formData = this.superForm.value;

      this.http.post('https://13.48.195.231:443/user/createsuper', formData,{
        headers: this.getHeaders()}).subscribe({
        next: (res) => {
          console.log('Superuser created successfully:', res);
          alert('Superuser registered successfully!');
          this.superForm.reset();
        },
        error: (err) => {
          console.error('Error creating superuser:', err);
          alert('Something went wrong!');
        }
      });
    }
  }
}

