import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginData = {
  username:'',
  password:''
};
  constructor(private snack:MatSnackBar,private login:LoginService,private router:Router) { }

  ngOnInit(): void {
  }
  loginSubmit()
  {
    console.log("Login form submit");
    if(this.loginData.username.trim()=='' || this.loginData.username==null)
    {
       this.snack.open('Username is requried !!','',{
         duration:3000
       });
       return;
    }
    if(this.loginData.password=='' || this.loginData.password==null)
    {
       this.snack.open('password is required !!','',{
         duration:3000
       });
       return;
    }
    //request to server to generate token
    this.login.generateToken(this.loginData).subscribe(
      (data:any) => {
        console.log("Success");
        //console.log(data);
        //Login
        this.login.loginUser(data.token);
        this.login.getCurrentUser().subscribe(
         (user:any)=>{
           this.login.setUser(user);
           //console.log(user);
           //redirect ....ADMIN.........Admin Dashboard
           //redirect .......NORMAL.........Normal Dashboard
           if(this.login.getUserRole()=="ADMIN")
           {
             //admin dashboard
             //window.location.href="/dashboard";
             this.router.navigate(['dashboard']);
             this.login.loginStatusSubject.next(true);
           }
           else
           if(this.login.getUserRole()=="NORMAL")
           {
             //normal user dashboard
             //window.location.href="/user-dashboard";
             this.router.navigate(['user-dashboard/0']);
             this.login.loginStatusSubject.next(true);
           }
           else
           {
             this.login.logout();
           }
         }
        );
      }
      ,
      (error) =>{
        console.log("Error !!");
        console.log(error);
        this.snack.open("Invalid Username & password !! Try Again ",'',{
          duration:3000
        });        
      }
      );
  }
}
