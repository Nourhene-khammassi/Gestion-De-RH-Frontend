import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationRequest } from 'src/app/modules/authentication-request';



import { AuthenticationResponse } from 'src/app/modules/authentication-response';
import { RegisterRequest } from 'src/app/modules/register-request';
import { environment } from 'src/environments/environment';

import jwt_decode from "jwt-decode";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  
  constructor(private router : Router,private httpClient: HttpClient) { }
  private baseUrl=environment.baseurl+"/auth"
  isUserAuthenticated():boolean{
    if (localStorage.getItem ("accesstoken")){
      return true;
    }
    this.router.navigate(["/login"])
return false;
  }
  login(authenticationRequest : AuthenticationRequest):Observable<AuthenticationResponse>{
    const url=this.baseUrl+"/authenticate"
    return this.httpClient.post(url,authenticationRequest)
  }
 // setUserToken (authenticationResponse: AuthenticationResponse){
   // localStorage.setItem("accesstoken",JSON.stringify(authenticationResponse))

 // }
  register(registerRequest: RegisterRequest):Observable<AuthenticationResponse>{
    const url=this.baseUrl+"/register"
    return this.httpClient.post(url,registerRequest)
  }
   setUserToken (authenticationResponse: AuthenticationResponse){
    localStorage.setItem("accesstoken",JSON.stringify(authenticationResponse))
  const token = authenticationResponse.token;
  if (token) {
  const decodedToken = jwt_decode(token) as any;
  const fullName = decodedToken.fullName;
  localStorage.setItem("fullName", fullName);
  const userId = decodedToken.userId;
  localStorage.setItem("userId", userId);
  console.log("uuuuuuuuuuuuuuuuuuuuuuuuuu")
  console.log(decodedToken)
    }
    

}
/*getrole(){
var user:any
user=localStorage.getItem("accesstoken")
return JSON.parse(user).role

}*/

  getRole = () => {
    var user: any;
    user = localStorage.getItem('accesstoken');
    let token = JSON.parse(user).token;
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken.authorities[0].authority;
  }
   
}

  

