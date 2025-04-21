

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-login',
  imports:[FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient,private router:Router,private auth: AuthService) {
    this.loginForm = this.fb.group({
      name: ['', Validators.required],
      password: ['', Validators.required]
    });
  }



  onLogin() {
    const payload = {
      name: this.loginForm.value.name,
      password: this.loginForm.value.password
    };
  
    this.auth.loginUser(payload).subscribe({
      next: (res) => {
        console.log("Login successful:", res);
        
        let role = res.user.role;
if (role?.startsWith('{') && role.endsWith('}')) {
  role = role.slice(1, -1); // removes { and }
}
        
        // localStorage.setItem("token", res.token);
        // localStorage.setItem("user", JSON.stringify(res.user));
  
        
        // this.router.navigate(["/user-dashboard"]);

        this.auth.storeToken(res.access_token);
        this.auth.storeUserRole(role); 
        this.redirectToDashboard(role);
      },
      error: (err) => {
        console.error("Login failed", err);
        alert("Invalid username or password");
      }
    });
  }
  

  navigateToRegister(): void {
        this.router.navigate(['/register']);
      }
  
  redirectToDashboard(role:string) {
    
    if (role === 'admin') this.router.navigate(['/admin-dashboard']);
    else if (role === 'super') this.router.navigate(['/superuser-dashboard']);
    else if (role === 'user') this.router.navigate(['/user-dashboard']);
    else this.router.navigate(['/login']);
  }
}


