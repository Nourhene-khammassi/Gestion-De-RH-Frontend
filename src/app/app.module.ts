import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MultiSelectModule} from 'primeng/multiselect';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HomeComponent } from './home/home.component';


import { AuthIntercepterService } from './services/intercepter/auth-intercepter.service';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DepartementComponent } from './pages/pageRH/departement/departement.component';
import { EmployeeComponent } from './pages/pageRH/employee/employee.component';



import { NoteserviceComponent } from './pages/pageRH/noteservice/noteservice.component';
import { CongeComponent } from './pages/pageRH/conge/conge.component';
import { DemandecongeComponent } from './pages/pageRH/demandeconge/demandeconge.component';
import { FormationComponent } from './pages/pageRH/formation/formation.component';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [

    AppComponent,
   
    
    
    
    HeaderComponent,
    SidebarComponent,
    HomeComponent,
   
    RegisterComponent,
    LoginComponent,
    DepartementComponent,
    EmployeeComponent,
    
  
   
    NoteserviceComponent,
    CongeComponent,
    DemandecongeComponent,
    FormationComponent,
   
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MultiSelectModule,
    BrowserAnimationsModule,
   
  ],
  providers: [{provide :HTTP_INTERCEPTORS, useClass:AuthIntercepterService,multi :true},DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
