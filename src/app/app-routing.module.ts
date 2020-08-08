import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ClassesComponent } from './classes/classes.component';
import { GradesComponent } from './grades/grades.component';
import { ClassSchedulerComponent } from './class-scheduler/class-scheduler.component';
import { OktaCallbackComponent, OktaAuthGuard } from '@okta/okta-angular';


const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [OktaAuthGuard] },
  { path: 'classes', component: ClassesComponent, canActivate: [OktaAuthGuard] },
  { path: 'grades', component: GradesComponent, canActivate: [OktaAuthGuard] },
  { path: 'classScheduler', component: ClassSchedulerComponent, canActivate: [OktaAuthGuard] },
  { path: 'implicit/callback', component: OktaCallbackComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }