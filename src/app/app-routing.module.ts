import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';




import { HomeComponent } from './home/home.component';


import { AuthGuardService } from './services/guard/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';



import { SidebarComponent } from './sidebar/sidebar.component';

import { DepartementComponent } from './pages/pageRH/departement/departement.component';
import { EmployeeComponent } from './pages/pageRH/employee/employee.component';



import { NoteserviceComponent } from './pages/pageRH/noteservice/noteservice.component';
import { DemandecongeComponent } from './pages/pageRH/demandeconge/demandeconge.component';
import { FormationComponent } from './pages/pageRH/formation/formation.component';


const routes: Routes = [


{path :"login",component:LoginComponent },
{path :"register",component:RegisterComponent },

{path :"",component:SidebarComponent,canActivate : [AuthGuardService]} ,
{path :"home",component:SidebarComponent,canActivate : [AuthGuardService],children:[
{path :"gestionemployee",component:EmployeeComponent,canActivate : [AuthGuardService]} ,
{path :"departement",component:DepartementComponent,canActivate : [AuthGuardService]} ,


{path :"gestionformation",component:FormationComponent} ,
{path :"notesdesservices",component:NoteserviceComponent} ,
{path :"demandecongeComponent",component:DemandecongeComponent} ,
//,canActivate : [AuthGuardService]
//,canActivate : [AuthGuardService]
  /*{path:"liststgr",component:ListestagiaireComponent,canActivate : [AuthGuardService]},
  {path:"ListeEncadreur",component:ListencadreurComponent,canActivate : [AuthGuardService]},
  {path:"modifencadr",component:ModifencadrComponent,canActivate : [AuthGuardService]},
  {path:"detailencadreur/:id",component:DetailencadComponent,canActivate : [AuthGuardService]},
  {path:"ajoutencadr",component:AjoutencadComponent,canActivate : [AuthGuardService]},
  {path:"ajoutstagiaire",component:AjoutstagerComponent,canActivate : [AuthGuardService]},
  {path:"detailstagiaire/:id",component:DetailstagiaireComponent,canActivate : [AuthGuardService]},
  {path:"modifstagiaire",component:ModifstagiaireComponent,canActivate : [AuthGuardService]},
  {path:"Dashboard",component:HomeComponent,canActivate : [AuthGuardService]},
  {path:"detailstage/:id",component:DetailstageComponent,canActivate : [AuthGuardService]},
  {path :"ajoutstage",component:AjoutstageComponent,canActivate : [AuthGuardService]},
{path :"modifstage",component:ModifstageComponent,canActivate : [AuthGuardService]}*/
]}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
