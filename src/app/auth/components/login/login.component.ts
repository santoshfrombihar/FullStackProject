import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isSignUpClicked: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }


  FormChangeClicked(clickedText : string){
    if(clickedText == 'signup'){
      this.isSignUpClicked = true;
    }
    else{
      this.isSignUpClicked = false;
    }
  }
}
