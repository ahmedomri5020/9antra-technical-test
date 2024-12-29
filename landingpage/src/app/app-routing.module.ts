import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landingpage/landingpage.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent }, // Set LoginComponent as the default route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
