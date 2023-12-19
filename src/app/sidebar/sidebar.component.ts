import { ResourceLoader } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  fullname : any;
  role!:string;
  constructor( private autserv:AuthService) { }

  ngOnInit(): void {
//this.role='ADMIN'
this.role=this.autserv.getRole()
//role!:string;
console.log("role", this.role)
this.fullname=localStorage.getItem("fullName")
//console.log(this.role)
   /* if (localStorage.getItem("accesstoken")){
      this.fullname= JSON.parse(localStorage.getItem("accesstoken")as string).name;
      console.log(JSON.parse(localStorage.getItem("accesstoken")as string))
    }*/

  }
  relogin(){
    
    localStorage.removeItem("accesstoken")
    window.location.reload ();
  }
  

}
