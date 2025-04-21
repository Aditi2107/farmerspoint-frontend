
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-register',
  imports:[FormsModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      phone_number: ['', Validators.required],
      password: ['', Validators.required]
      // role: ['', Validators.required],
    });
  }
  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

  onRegister() {
    const userData = {
      name: this.registerForm.value.name,
      phonenumber: this.registerForm.value.phone_number,
      password_hash: this.registerForm.value.password
      // role: [this.registerForm.value.role],  // backend expects role as list
    };

    this.auth.register(userData).subscribe({
      next: (res) => {
        console.log('Registration success:', res);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Registration error:', err);
        alert('Registration failed. Try again.');
      },
    });
  }
}

