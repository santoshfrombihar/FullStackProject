import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserserviceService } from '../userservice.service';
import { loginModel, userModel } from 'src/app/Models/userModel';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isSignUpClicked: boolean = false;
  isInvalidPassword: boolean = false;
  isInvalidName: boolean = false;
  isInvalidEmail: boolean = false;
  isPasswordNotMatched: boolean = false;
  validatationMessage: string = '';
  isRegisterSucess: boolean = false;
  isLoginFailed: boolean = false;
  loginSuceessMessage: string = 'You have sucessfully registered';
  loginFailedMessage: string = 'Incorrect Email or Password'

  constructor(private service: UserserviceService, private router: Router) {
  }

  ngOnInit(): void {
  }


  formChangeClicked(clickedText: string) {
    if (clickedText == 'signup') {
      this.isSignUpClicked = true;
      this.isRegisterSucess = false;
    }
    else {
      this.isSignUpClicked = false;
      this.isLoginFailed = false;
    }
  }

  signup(form: NgForm) {
    if (this.validateData(form)) {
      const user: userModel = {
        name: form.value.name,
        email: form.value.email,
        password: form.value.password
      };
      this.service.signupUser(user).subscribe(data => {
        if (data) {
          console.log(data);
          this.isSignUpClicked = false;
          this.isRegisterSucess = true;
        }
      })
    }
  }

  login(form: NgForm) {
    if (this.validateData(form)) {
      const loginDetails: loginModel = {
        email: form.value.email,
        password: form.value.password
      }
      this.service.loginUser(loginDetails).subscribe(
        (data: any) => {
          if (data.token && data) {
            localStorage.setItem('token',data.token);
            this.router.navigate(['deskboard']);
          }
        },
        (error) => {
          if (error.status == 401) {
            this.isLoginFailed = true;
          }
        }
      )
    }
  }


  validateData(form: any) {
    const emailRegex: RegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const nameRegex: RegExp = /^[a-zA-Z\s]{2,25}$/;
    const passwordRegex: RegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,20}$/;
    if (!emailRegex.test(form.value.email)) {
      this.isInvalidEmail = true;
      this.validatationMessage = 'Invalid Email Id, Please input in correct format';
    }
    if (!nameRegex.test(form.value.name)) {
      this.isInvalidName = true;
      this.validatationMessage = 'Invalid Name, Name should contain only character';
    }
    if (!passwordRegex.test(form.value.password)) {
      this.isInvalidPassword = true;
      this.validatationMessage = 'Password should have max 6 digit and should contain capital latter, special symbol'
    }
    if (form.value.password2 != null) {
      if (form.value.password != form.value.password2) {
        this.isPasswordNotMatched = true;
        this.validatationMessage = 'Password not matched'
      }
    }
    if (this.isInvalidEmail || this.isInvalidName || this.isInvalidPassword || this.isPasswordNotMatched) {
      this.isInvalidEmail = false;
      this.isInvalidPassword = false;
      this.isInvalidName = false;
      this.isPasswordNotMatched = false;
      return false;
    }
    this.validatationMessage = '';
    return true;
  }

}
