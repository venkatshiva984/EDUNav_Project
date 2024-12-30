import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {

  name: string = '';

  constructor(private router: Router) {}
  
  onContinue(): void {
    if(this.name){
      localStorage.setItem('name', this.name);
      this.router.navigate(['/edu-nav-ai']);
    }
  }
}
