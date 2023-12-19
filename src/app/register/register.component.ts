import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterRequest } from '../modules/register-request';
import { AuthService } from '../services/auth/auth.service';
import { DepartementService } from '../services/SERVICERH/departement.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerRequest: RegisterRequest = new RegisterRequest();
  Dpts:any;
  errorMsg ! : string;
  constructor(private authService : AuthService, private router: Router,private departementService: DepartementService) { }

  ngOnInit(): void {
    this.departementService.getlistdpt().subscribe
    ({
      next: (res) => {
       this.Dpts=res;
        console.log(res)
      },
     // error: (e) => console.error(e)
    });
  }
  register(){
    this.authService.register(this.registerRequest)
    .subscribe(result=>{
      this.router.navigate(["home/"])
   
      console.log("TTTTTTTT")
      console.log(result)
    
    },
    (err:HttpErrorResponse)=>this.errorMsg='this email is existe')
  }

}
