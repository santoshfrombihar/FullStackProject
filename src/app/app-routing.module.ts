import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { DeskboardComponent } from './components/deskboard/deskboard.component';
import { ProfilestepComponent } from './components/profilestep/profilestep.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'deskboard', component: DeskboardComponent },
  { path: 'stepper', component: ProfilestepComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
