import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(private auth:AuthService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {


  }
  onSubmit(){
    if(this.loginForm.status=="INVALID"){
      alert("Please enter Username and Password")

    }else{

      const user = {
        username: this.loginForm.controls.username.value,
        password: this.loginForm.controls.password.value,
      }

      this.auth.login(user).subscribe((res)=>{
        localStorage.setItem('token', res.token);
        localStorage.setItem('username', res.username);
        this.router.navigateByUrl('/contacts')
      }, (err)=>{
        alert("Invalid data")
      })
    }
  }

}
