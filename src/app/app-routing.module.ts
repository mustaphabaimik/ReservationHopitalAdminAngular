import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ListservicesComponent } from './components/listservices/listservices.component';
import { MedecinComponent } from './components/medecin/medecin.component';


const routes: Routes = [

  {
    path:'',component:DashboardComponent
  },
  {
    path:'services',component:ListservicesComponent
  },
  {
    path:'medecins',component:MedecinComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
