// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-landing-page',
//   imports: [],
//   templateUrl: './landing-page.component.html',
//   styleUrl: './landing-page.component.css'
// })
// export class LandingPageComponent {

// }

import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-landing-page',
  imports: [],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})




export class LandingPageComponent {

  constructor(private router: Router) {}
  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
