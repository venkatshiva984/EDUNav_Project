import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EduNavigatorComponent } from './components/edu-navigator/edu-navigator.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
  { path: '', redirectTo: 'edu-navigator', pathMatch: 'full' },
  { path: 'edu-navigator', component: LandingPageComponent },
  { path: 'edu-nav-ai', component: EduNavigatorComponent },
  { path: '**', redirectTo: 'error' } // Wildcard route to handle 404
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
