import { EventEmitter, Injectable } from '@angular/core';
import { SignUp, login } from '../data-type';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  isLoginError = new EventEmitter<boolean>(false)
  constructor(private http: HttpClient, private router:Router) { }
  userSignUp(data:SignUp){
    console.log("ss")
    let res = this.http.post("http://localhost:3000/users",
    data,
    {observe:"response"}).subscribe((result)=>{
        //console.log(result)
        if(result){
          localStorage.setItem('user',JSON.stringify(result.body))
          this.router.navigate(['/'])
        }
    })
  }
  userAuthReload(){
    if(localStorage.getItem('user')){
      this.router.navigate(['/'])
    }
  }
  userLogin(data: login){
    //console.log(data)
    this.http.get(`http://localhost:3000/users?email=${data.email}&password=${data.password}`,{observe:"response"}).subscribe((result:any)=>{

    //console.log(result)
      if(result && result.body && result.body.length)
      {
        console.log("User logged in ")
        localStorage.setItem("user", JSON.stringify(result.body))
        this.router.navigate(['/'])
      }
      else
      {
        console.log("Login Failed")
        this.isLoginError.emit(true)
      }
    })
}
}
