import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationRequest } from '../modules/authentication-request';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
authenticationRequest :AuthenticationRequest=new AuthenticationRequest();
errorMsg : string=""
path: string = "../assets/img/boxed-bg.jpg";


  constructor(private authService : AuthService, private router: Router) { }
  
  ngOnInit(): void {
  //  localStorage.removeItem("accesstoken")
  localStorage.clear()
  }
  login(){
    this.authService.login(this.authenticationRequest).subscribe(
      
      ress =>{
        this.authService.setUserToken(ress)

        console.log("HELL", ress)
        //console.log (this.authService.getRole())
        const name=localStorage.getItem("fullName")
        console.log(name)
       this.router.navigate(["/home"])

      },error =>{
        this.errorMsg= "login ou mot de pass incorect"
      }
    )

  }

}
